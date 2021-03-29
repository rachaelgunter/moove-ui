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
} from './datasets.types';
import { google } from 'googleapis';
import { GCSClient } from 'src/gcs/gcs-client';

// List of folders which have own request
const BLACK_LIST_OF_VISUALIZATIONS_FOLDERS = ['/joint_plot'];

@Injectable()
export class DatasetsService {
  private readonly logger = new Logger(DatasetsService.name);
  private readonly auth = new google.auth.GoogleAuth();

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly storageClient: GCSClient,
  ) {}

  async createDataset(datasetParams: DatasetParamsInput): Promise<string> {
    const {
      name,
      projectId,
      datasetId,
      tableId,
      description,
      organizationName,
      analysisProject,
      assetsBucket,
    } = datasetParams;
    const ingestionTriggerURL = this.configService.get(
      'INGESTION_TRIGGER_CLOUD_FUNCTION_URL',
    );
    const client = await this.auth.getIdTokenClient(ingestionTriggerURL);
    const headers = await client.getRequestHeaders(ingestionTriggerURL);

    this.logger.log(
      `Starting ingestion process for dataset: ${JSON.stringify(
        datasetParams,
      )}`,
    );

    return this.httpService
      .post<string>(
        ingestionTriggerURL,
        {
          analysis_name: name,
          source_table: tableId,
          source_dataset: datasetId,
          source_project: projectId,
          analysis_description: description,
          client: organizationName,
          analysis_project: analysisProject,
          visual_asset_bucket: assetsBucket,
          lat: 'latitude',
          lon: 'longitude',
          primary_ts: 'received_time',
          extraneous_geographies: [],
          groupby_col: 'adminarea_3',
          jenks_cols: [
            'heading_deg',
            'accelerateVector',
            'errorAmplitudeVector',
            'temperatureExterior',
            'rainIntensity',
          ],
          distance_from_road: 50,
          validation_sample_perc: 0.05,
          sampling_perc: 0.95,
          training_sample_perc: 0.5,
          sampling_max: 150000,
          moove_stats_cols: ['temp_c', 'gust_mph', 'precip_mm', 'vis_km'],
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
    }));
  }

  async getColumnVisualizations(
    bucketName: string,
    organizationName: string,
    analysisName: string,
    columnName: string,
    subFolder?: string,
  ): Promise<string[]> {
    const visualizationsUrls = await this.storageClient.listObjects(
      bucketName,
      organizationName,
      analysisName,
      columnName,
      subFolder,
    );

    if (subFolder) return visualizationsUrls ?? [];

    return this.filterVisualizationsUrls(visualizationsUrls);
  }

  filterVisualizationsUrls(visualizationsUrls: string[]): string[] {
    return (
      visualizationsUrls?.filter((url) =>
        BLACK_LIST_OF_VISUALIZATIONS_FOLDERS.some(
          (folder) => !url.includes(folder),
        ),
      ) ?? []
    );
  }

  getDatasetStatus(
    statuses: Record<string, CloudFunctionDatasetStatus>,
  ): DatasetStatus {
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
}
