import { bigquery_v2, google } from 'googleapis';
import { BigQuery } from '@google-cloud/bigquery';
import { getPreviewTableData } from '../utils';
import {
  BigQueryDataset,
  BigQueryPreviewTable,
  BigQueryProject,
  BigQuerySegment,
  BigQueryTable,
  BigQueryTableData,
  BigQueryTableInfo,
} from '../bigquery.types';
import { GoogleClientService } from 'src/google-client/google-client.service';

export class BigqueryClientService extends GoogleClientService {
  private bigQuery: bigquery_v2.Bigquery = google.bigquery('v2');

  async getProjects(): Promise<BigQueryProject[]> {
    const auth = await this.getAuthClient();

    return this.bigQuery.projects
      .list({
        auth,
      })
      .then(({ data }) => this.mapProjects(data));
  }

  async getProjectDatasets(projectId: string): Promise<BigQueryDataset[]> {
    const auth = await this.getAuthClient();

    return this.bigQuery.datasets
      .list({
        auth,
        projectId,
      })
      .then(({ data }) => this.mapDatasets(data));
  }

  async getDatasetTables(
    projectId: string,
    datasetId: string,
  ): Promise<BigQueryTable[]> {
    const auth = await this.getAuthClient();

    return this.bigQuery.tables
      .list({
        auth,
        datasetId,
        projectId,
      })
      .then(({ data }) => this.mapTables(data));
  }

  mapProjects({ projects }: bigquery_v2.Schema$ProjectList): BigQueryProject[] {
    return projects?.map(({ numericId, id, friendlyName }) => ({
      numericId,
      projectId: id,
      friendlyName,
    }));
  }

  mapDatasets({ datasets }: bigquery_v2.Schema$DatasetList): BigQueryDataset[] {
    return datasets?.map(({ datasetReference }) => ({
      datasetId: datasetReference.datasetId,
      projectId: datasetReference.projectId,
    }));
  }

  mapTables({ tables }: bigquery_v2.Schema$TableList): BigQueryTable[] {
    return tables?.map(({ tableReference }) => ({
      datasetId: tableReference.datasetId,
      tableId: tableReference.tableId,
    }));
  }

  async getTableDataList(
    projectId: string,
    datasetId: string,
    tableId: string,
    startIndex: number,
    maxResults: number,
  ): Promise<BigQueryTableData> {
    const auth = await this.getAuthClient();

    return this.bigQuery.tabledata
      .list({
        auth,
        datasetId,
        projectId,
        tableId,
        startIndex: startIndex.toString(),
        maxResults,
      })
      .then(({ data }) => {
        const rows = data.rows.map((row) => {
          const values = row.f.map((item) => {
            let v = item.v;
            if (typeof item.v === 'object') {
              v = JSON.stringify(item.v);
            }
            return { v };
          });

          return {
            ...row,
            ...{ f: values },
          };
        });

        const res = {
          ...data,
          rows: rows,
        };

        return res;
      });
  }

  async getTableInfo(
    projectId: string,
    datasetId: string,
    tableId: string,
  ): Promise<BigQueryTableInfo> {
    const auth = await this.getAuthClient();

    return this.bigQuery.tables
      .get({
        auth,
        datasetId,
        projectId,
        tableId,
      })
      .then(({ data }) => {
        const fields = data.schema?.fields?.map((field) => ({
          name: field.name,
          type: field.type,
        }));

        return {
          schema: {
            fields,
          },
        };
      });
  }

  async getPreviewTable(
    projectId: string,
    datasetId: string,
    tableId: string,
    startIndex: number,
    maxResults: number,
    selectedFields?: string[],
  ): Promise<BigQueryPreviewTable> {
    const auth = await this.getAuthClient();

    const selectedFieldsString = selectedFields?.join(',');
    const pRows = this.bigQuery.tabledata
      .list({
        auth,
        datasetId,
        projectId,
        tableId,
        startIndex: startIndex.toString(),
        maxResults,
        selectedFields: selectedFieldsString ?? undefined,
      })
      .then(({ data }) => {
        return data.rows;
      });
    const pHeaders = this.bigQuery.tables
      .get({
        auth,
        datasetId,
        projectId,
        tableId,
        selectedFields: selectedFieldsString ?? undefined,
      })
      .then(({ data }) => {
        return {
          fields: data.schema.fields,
          tableMetadata: { totalRows: +data.numRows },
        };
      });
    const [rows, { fields, tableMetadata }] = await Promise.all([
      pRows,
      pHeaders,
    ]);

    return {
      ...getPreviewTableData(fields, rows),
      tableMetadata,
    };
  }

  async getPreviewSegment(segmentId: string): Promise<BigQuerySegment[]> {
    const bigquery = new BigQuery();

    const query = `SELECT *
        from \`moove-platform-staging.here.road_segments_id_lookup\`
        where id = "${segmentId}"
          and id_partition = mod(FARM_FINGERPRINT("${segmentId}"), 4000)
        LIMIT 100`;

    return bigquery.query(query).then((data) => {
      return data[0];
    });
  }
}
