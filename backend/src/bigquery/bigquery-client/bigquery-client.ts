import { google } from 'googleapis';
import { TokenPair } from 'src/users/users.types';
import { BigQueryDataset, BigQueryProject } from '../bigquery.types';

export class BigqueryClient {
  oauthClient = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });

  constructor({ accessToken, refreshToken }: TokenPair) {
    this.oauthClient.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  async getProjects(): Promise<BigQueryProject[]> {
    return google
      .bigquery('v2')
      .projects.list({
        auth: this.oauthClient,
      })
      .then(({ data }) => {
        return data.projects?.map(({ numericId, id, friendlyName }) => ({
          numericId,
          projectId: id,
          friendlyName,
        }));
      });
  }

  async getProjectDatasets(projectId: string): Promise<BigQueryDataset[]> {
    return google
      .bigquery('v2')
      .datasets.list({
        auth: this.oauthClient,
        projectId,
      })
      .then(({ data }) => {
        return data.datasets?.map(({ datasetReference }) => ({
          datasetId: datasetReference.datasetId,
          projectId: datasetReference.projectId,
        }));
      });
  }
}
