import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Dataset,
  DatasetListingResponse,
  DatasetParamsInput,
  DatasetStatus,
  CloudFunctionDatasetStatus,
  ColumnVisualizations,
  FileDatasetParamsInput,
  RemovedDataset,
  CloudFunctionDatasetIngestStatus,
} from './datasets.types';
import { google } from 'googleapis';
import { GCSClient } from 'src/gcs/gcs-client';
import {
  DEFAULT_INGESTION_PARAMS,
  RELATIONSHIPS_VISUALIZATIONS_FOLDERS,
} from './constants';
import { UserTokenPayload } from 'src/users/users.types';
import { UsersService } from 'src/users/users.service';
import { ForbiddenError } from 'apollo-server-errors';

@Injectable()
export class DatasetsService {
  private readonly logger = new Logger(DatasetsService.name);
  private readonly auth = new google.auth.GoogleAuth();
  private readonly ingestorUrl = '';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly storageClient: GCSClient,
    private readonly usersService: UsersService,
  ) {
    this.ingestorUrl = this.configService.get(
      'INGESTION_TRIGGER_CLOUD_FUNCTION_URL',
    );
  }

  async triggerDatasetIngestion(
    datasetParams: DatasetParamsInput,
  ): Promise<string> {
    const {
      name,
      projectId,
      datasetId,
      tableId,
      description,
      organizationName,
      analysisProject,
      assetsBucket,
      primaryTimestamp,
      groupBy,
      jenksCols,
      lat,
      lon,
      primaryGeography,
    } = datasetParams;
    const headers = await this.getRequestHeaders(this.ingestorUrl);
    this.logger.log(
      `Starting ingestion process for dataset: ${JSON.stringify(
        datasetParams,
      )}`,
    );
    return this.httpService
      .post<string>(
        this.ingestorUrl,
        {
          ...DEFAULT_INGESTION_PARAMS,
          analysis_name: name,
          source_table: tableId,
          source_dataset: datasetId,
          source_project: projectId,
          analysis_description: description,
          client: organizationName,
          analysis_project: analysisProject,
          visual_asset_bucket: assetsBucket,
          primary_ts: primaryTimestamp,
          groupby_col: groupBy || undefined,
          jenks_cols: jenksCols.length ? jenksCols : undefined,
          lat: lat || undefined,
          lon: lon || undefined,
          primary_geography: primaryGeography || undefined,
        },
        {
          headers,
        },
      )
      .pipe(
        map((response) => response.data),
        catchError((e) => {
          this.logger.error(
            `Ingestion process for dataset ${JSON.stringify(
              datasetParams,
            )} failed`,
            e,
          );
          return throwError(e);
        }),
      )
      .toPromise();
  }

  async createDatasetFromLocalFile(
    datasetParams: FileDatasetParamsInput,
    user: UserTokenPayload,
  ): Promise<string> {
    const { fileName, name, organizationName } = datasetParams;
    await this.validateOrganizationMembership(
      user,
      organizationName,
      `You are not allowed to upload files for org ${organizationName}`,
    );

    const localUploadsTriggerURL = this.configService.get(
      'LOCAL_UPLOADS_INGESTION_TRIGGER_URL',
    );
    const headers = await this.getRequestHeaders(localUploadsTriggerURL);

    const { tableId, datasetId, projectId } = await this.httpService
      .post(
        localUploadsTriggerURL,
        { fileName, analysisName: name, organizationName },
        { headers },
      )
      .pipe(
        map((response) => response.data),
        catchError((e) => {
          this.logger.error(
            `Failed to prepare file ${fileName} for ingestion`,
            e,
          );
          return throwError(e);
        }),
      )
      .toPromise();

    return this.triggerDatasetIngestion({
      ...datasetParams,
      tableId,
      datasetId,
      projectId,
    });
  }

  async getDatasets(GCPProjectName: string): Promise<Dataset[]> {
    const cloudFunctionUrl = process.env.GOOGLE_CLOUD_FUNCTION_URL_GET_DATASETS;

    const client = await this.auth.getIdTokenClient(cloudFunctionUrl);
    const headers = await client.getRequestHeaders(cloudFunctionUrl);

    return this.httpService
      .post(cloudFunctionUrl, { analysis_project: GCPProjectName }, { headers })
      .pipe(map(({ data }) => this.mapDatasets(data)))
      .toPromise();
  }

  mapDatasets(datasetsResponse: DatasetListingResponse): Dataset[] {
    return Object.keys(datasetsResponse).map((key) => ({
      analysisName: key,
      bigQueryDatasetName: datasetsResponse[key].dataset_id,
      description: datasetsResponse[key].description,
      totalRows: datasetsResponse[key].total_rows,
      createdAt: datasetsResponse[key].created_at,
      status: this.getDatasetStatus(datasetsResponse[key].ingest_status),
      ingestStatus: JSON.stringify(datasetsResponse[key].ingest_status),
    }));
  }

  async getColumnVisualizations(
    bucketName: string,
    organizationName: string,
    analysisName: string,
    columnName: string,
  ): Promise<ColumnVisualizations> {
    const visualizationsUrls = await this.storageClient.listObjects(
      bucketName,
      organizationName,
      analysisName,
      columnName,
    );
    if (!visualizationsUrls) {
      return {
        id: analysisName + columnName,
        analyticsVisualizations: [],
        relationshipsVisualizations: [],
      };
    }
    return {
      id: analysisName + columnName,
      analyticsVisualizations: visualizationsUrls.filter(
        (url) =>
          !this.filterVisualizationsUrlsPredicate(
            url,
            RELATIONSHIPS_VISUALIZATIONS_FOLDERS,
          ),
      ),
      relationshipsVisualizations: visualizationsUrls.filter((url) =>
        this.filterVisualizationsUrlsPredicate(
          url,
          RELATIONSHIPS_VISUALIZATIONS_FOLDERS,
        ),
      ),
    };
  }

  filterVisualizationsUrlsPredicate(
    url: string,
    subfolders: string[],
  ): boolean {
    return subfolders.some((subfolder) => url.includes(subfolder));
  }

  getDatasetStatus(statuses: CloudFunctionDatasetIngestStatus): DatasetStatus {
    // Mocked for now since cloud function always returns failed for this
    statuses.choropleth = CloudFunctionDatasetStatus.ACTIVE;
    if (
      Object.values(statuses).every(
        (status) => status === CloudFunctionDatasetStatus.ACTIVE,
      )
    ) {
      return DatasetStatus.ACTIVE;
    }
    if (
      Object.values(statuses).some(
        (status) => status === CloudFunctionDatasetStatus.FAILED,
      )
    ) {
      return DatasetStatus.FAILED;
    }
    return DatasetStatus.PROCESSING;
  }

  async getDatasetFileUploadUrl(
    organizationName: string,
    analysisName: string,
    fileName: string,
    user: UserTokenPayload,
  ): Promise<string> {
    await this.validateOrganizationMembership(
      user,
      organizationName,
      `You are not allowed to upload files for org ${organizationName}`,
    );

    return this.storageClient.generateUploadSignedURL(
      organizationName,
      analysisName,
      fileName,
    );
  }

  async getRequestHeaders(url: string): Promise<{ [index: string]: string }> {
    const client = await this.auth.getIdTokenClient(url);
    return client.getRequestHeaders(url);
  }

  async validateOrganizationMembership(
    user: UserTokenPayload,
    organizationName: string,
    errorMessage: string,
  ): Promise<void | never> {
    const dbUser = await this.usersService.getUserById(user.sub);
    if (dbUser.organization.name !== organizationName) {
      throw new ForbiddenError(errorMessage);
    }
  }

  async deleteDataset(
    analysisName: string,
    analysisProject: string,
  ): Promise<RemovedDataset> {
    const url = this.configService.get('DELETE_DATASET_CLOUD_FUNCTION_URL');
    const headers = await this.getRequestHeaders(url);

    return this.httpService
      .post(
        url,
        { analysis_name: analysisName, analysis_project: analysisProject },
        { headers },
      )
      .pipe(
        map(() => ({
          analysisName,
          analysisProject,
        })),
        catchError((e) => {
          this.logger.error(
            `Failed to delete dataset ${analysisName} ${JSON.stringify(e)}`,
          );
          return throwError(e);
        }),
      )
      .toPromise();
  }
}
