import { OAuth2Client } from 'google-auth-library';
import { storage_v1, google } from 'googleapis';

export class GCSClient {
  private readonly oauthClient: OAuth2Client;
  private readonly storage: storage_v1.Storage;

  constructor({ accessToken, refreshToken }) {
    this.oauthClient = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });
    this.oauthClient.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    this.storage = google.storage('v1');
  }

  async listObjects(
    bucketName: string,
    analysisName: string,
    columnName: string,
  ): Promise<string[]> {
    return this.storage.objects
      .list({
        auth: this.oauthClient,
        bucket: bucketName,
        prefix: `${analysisName}/visual_artifacts/columns/${columnName}`,
      })
      .then((response) =>
        response.data.items?.map(
          (item) =>
            `https://storage.cloud.google.com/${bucketName}/${item.name}`,
        ),
      );
  }
}
