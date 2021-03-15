import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import {
  Dataset,
  DatasetListingResponse,
  StatusesListingResponse,
  DatasetParamsInput,
} from './datasets.types';
import { google } from 'googleapis';

@Injectable()
export class DatasetsService {
  private readonly auth = new google.auth.GoogleAuth();

  constructor(private readonly httpService: HttpService) {}

  /**
   * Implementation likely to be changed since we'll pass more dataset parameters from FE
   * and cloud function is going to be authorized in the future
   */
  createDataset(datasetParams: DatasetParamsInput): Promise<string> {
    const { name, projectId, datasetId, tableId, description } = datasetParams;
    return this.httpService
      .post<string>(
        'https://us-central1-moove-platform-testing-data.cloudfunctions.net/galileo-ingest',
        {
          analysis_name: name,
          source_table: tableId,
          source_dataset: datasetId,
          source_project: projectId,
          analysis_description: description,
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
      )
      .pipe(map((response) => response.data))
      .toPromise();
  }

  async getDatasets(): Promise<Dataset[]> {
    const cloudFunctionUrl =
      'https://us-central1-moove-road-iq-staging.cloudfunctions.net/get-galileo-analyses';

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

  async mapDatasets(datasetsResponse: DatasetListingResponse) {
    return Promise.all([
      ...Object.keys(datasetsResponse).map(async (key) => ({
        analysisName: key,
        bigQueryDatasetName: datasetsResponse[key].dataset_id,
        description: datasetsResponse[key].description,
        totalRows: datasetsResponse[key].total_rows,
        createdAt: datasetsResponse[key].created_at,
        status: await this.getDatasetsStatuses(key),
      })),
    ]);
  }

  async getDatasetsStatuses(analysisName: string) {
    const cloudFunctionUrl =
      'https://us-central1-moove-road-iq-staging.cloudfunctions.net/poll-ingest';

    const client = await this.auth.getIdTokenClient(cloudFunctionUrl);
    const headers = await client.getRequestHeaders(cloudFunctionUrl);

    return this.httpService
      .post(cloudFunctionUrl, { analysis_name: analysisName }, { headers })
      .pipe(map(({ data }) => this.mapDatasetStatuses(data)))
      .toPromise()
      .catch((error) => {
        console.error({ error: error.message });

        return 'error';
      });
  }

  mapDatasetStatuses(statusesResponse: StatusesListingResponse) {
    return statusesResponse.dataset_status;
  }
}
