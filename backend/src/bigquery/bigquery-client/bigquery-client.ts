import { google } from 'googleapis';
import { TokenPair } from 'src/users/users.types';
import { BigQueryProject } from '../bigquery.types';

export class BigqueryClient {
  oauthClient = new google.auth.OAuth2();

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
        return data.projects.map(({ numericId, id, friendlyName }) => ({
          numericId,
          projectId: id,
          friendlyName,
        }));
      });
  }
}
