import { OAuth2Client } from 'google-auth-library';
import { bigquery_v2, google } from 'googleapis';
import { TokenPair } from 'src/users/users.types';
import {
  BigQueryDataset,
  BigQueryPreviewTable,
  BigQueryProject,
  BigQueryTable,
  BigQueryTableData,
  BigQueryTableInfo,
} from '../bigquery.types';
import { convertTableDataRowsToArray, getPreviewTableHeaders } from '../utils';

export class BigQueryClient {
  private readonly oauthClient: OAuth2Client;
  private readonly bigQuery: bigquery_v2.Bigquery;
  private readonly cloudFunction = google.cloudfunctions('v1');

  constructor({ refreshToken }: TokenPair) {
    this.oauthClient = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });
    this.oauthClient.setCredentials({
      refresh_token: refreshToken,
    });
    this.bigQuery = google.bigquery('v2');
  }

  async getProjects(): Promise<BigQueryProject[]> {
    return this.bigQuery.projects
      .list({
        auth: this.oauthClient,
      })
      .then(({ data }) => this.mapProjects(data));
  }

  async getProjectDatasets(projectId: string): Promise<BigQueryDataset[]> {
    return this.bigQuery.datasets
      .list({
        auth: this.oauthClient,
        projectId,
      })
      .then(({ data }) => this.mapDatasets(data));
  }

  async getDatasetTables(
    projectId: string,
    datasetId: string,
  ): Promise<BigQueryTable[]> {
    return this.bigQuery.tables
      .list({
        auth: this.oauthClient,
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
    startIndex: string,
    maxResults: number,
  ): Promise<BigQueryTableData> {
    return this.bigQuery.tabledata
      .list({
        auth: this.oauthClient,
        datasetId,
        projectId,
        tableId,
        startIndex,
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
    return this.bigQuery.tables
      .get({
        auth: this.oauthClient,
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
    startIndex: string,
    maxResults: number,
    selectedFields?: string[],
  ): Promise<BigQueryPreviewTable> {
    const selectedFieldsString = selectedFields?.join(',');
    const pRows = this.bigQuery.tabledata
      .list({
        auth: this.oauthClient,
        datasetId,
        projectId,
        tableId,
        startIndex,
        maxResults,
        selectedFields: selectedFieldsString ?? undefined,
      })
      .then(({ data }) => {
        return convertTableDataRowsToArray(data.rows);
      });
    const pHeaders = this.bigQuery.tables
      .get({
        auth: this.oauthClient,
        datasetId,
        projectId,
        tableId,
        selectedFields: selectedFieldsString ?? undefined,
      })
      .then(({ data }) => {
        return getPreviewTableHeaders(data.schema.fields);
      });
    const [rows, headers] = await Promise.all([pRows, pHeaders]);

    return {
      rows,
      headers,
    };
  }
}
