import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Dataset,
  DatasetListingResponse,
  DatasetParamsInput,
  DatasetStatus,
} from './datasets.types';
import { google } from 'googleapis';
import { UsersService } from 'src/users/users.service';
import { UserTokenPayload } from 'src/users/users.types';
import { GCSClient } from 'src/gcs/gcs-client';

@Injectable()
export class DatasetsService {
  private readonly logger = new Logger(DatasetsService.name);
  private readonly auth = new google.auth.GoogleAuth();

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async createDataset(datasetParams: DatasetParamsInput): Promise<string> {
    const { name, projectId, datasetId, tableId, description } = datasetParams;
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
          client: 'car_company', // hardcoded until user organizations are not implemented
          primary_id: 'uuid',
          primary_geography: 'geog',
          lat: 'latitude',
          lon: 'longitude',
          primary_ts: 'received_time',
          extraneous_geographies: [],
          data_to_join: ['hydrated', 'weather', 'traffic'],
          stats: ['general_stats', 'grouped_stats', 'correlation'],
          general_stats: null,
          groupby_col: 'adminarea_3',
          model_name: 'jackjack_test_model',
          model_type: 'logistic_reg',
          bins: {
            temperature: [-32, 0, 32, 50, 100],
            windSpeed: [0, 2, 6, 10, 80],
          },
          input_cols: {
            precip24Hour: 'precip24Hour',
            snow24Hour: 'snow24Hour',
            visibility: 'visibility',
            temperature_binned: 'temperature_binned',
            harmful_event:
              "IF(harmful_event_seq_1 = 'FRONT TO REAR WITH MV IN TRANSPORT', 0, 1)",
          },
          where_clause: '',
          model_options: {
            MODEL_TYPE: 'logistic_reg',
            DATA_SPLIT_METHOD: 'RANDOM',
            DATA_SPLIT_EVA_FRACTION: 0.25,
            INPUT_LABEL_COLS: ['harmful_event'],
          },
          jenks_cols: [
            'heading_deg',
            'accelerateVector',
            'errorAmplitudeVector',
            'temperatureExterior',
            'rainIntensity',
          ],
          smote_config: '',
          model_analysis: 'true',
          overwrite: 'false',
          hdbscan: ['geo_x', 'geo_y'],
          corr_matrix: [36, 30],
          distance_from_road: 50,
          validation_sample_perc: 0.05,
          sampling_perc: 0.95,
          training_sample_perc: 0.5,
          sampling_max: 150000,
          weights: '',
          bbox: null,
          time_range: null,
          validation_bbox: null,
          qual_stats: 'true',
          sampling_type: 'pure-random',
          to_visualize: { corr_matrix: null, auto_viz: 'curvature_wt_avg_0_1' },
          cluster: 'moove-modules-1',
          cluster_region: 'us-central1',
          cluster_project: 'moove-platform-staging',
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

  async getDatasets(): Promise<Dataset[]> {
    const cloudFunctionUrl = process.env.GOOGLE_CLOUD_FUNCTION_URL_GET_DATASETS;

    const client = await this.auth.getIdTokenClient(cloudFunctionUrl);
    const headers = await client.getRequestHeaders(cloudFunctionUrl);

    return this.httpService
      .post(
        cloudFunctionUrl,
        { analysis_project: 'moove-platform-testing-data' },
        { headers },
      )
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
      status: Object.values(datasetsResponse[key].ingest_status).every(
        (status) => status,
      )
        ? DatasetStatus.ACTIVE
        : DatasetStatus.PROCESSING,
    }));
  }

  async getColumnVisualizations(
    user: UserTokenPayload,
    bucketName: string,
    analysisName: string,
    columnName: string,
  ): Promise<string[]> {
    const tokens = await this.usersService.getGoogleTokens(user.sub);
    const client = new GCSClient(tokens);

    return client.listObjects(bucketName, analysisName, columnName);
  }
}
