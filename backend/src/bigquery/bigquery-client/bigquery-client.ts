import { Logger } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { bigquery_v2, google } from 'googleapis';
import { TokenPair } from 'src/users/users.types';
import {
  BigQueryDataset,
  BigQueryProject,
  BigQueryTable,
} from '../bigquery.types';

export class BigQueryClient {
  private readonly oauthClient: OAuth2Client;
  private readonly logger = new Logger(BigQueryClient.name);
  private readonly bigQuery: bigquery_v2.Bigquery;

  constructor({ accessToken, refreshToken }: TokenPair) {
    this.oauthClient = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });
    this.oauthClient.setCredentials({
      access_token: accessToken,
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
}
