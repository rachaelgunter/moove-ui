import { storage_v1, google } from 'googleapis';
import { GoogleClientService } from 'src/google-client/google-client.service';

export class GCSClient extends GoogleClientService {
  private storage: storage_v1.Storage = google.storage('v1');

  async listObjects(
    bucketName: string,
    organizationName: string,
    analysisName: string,
    columnName: string,
    subFolder?: string,
  ): Promise<string[]> {
    const auth = await this.getAuthClient();
    let prefix = `${organizationName}/${analysisName}/visual_artifacts/columns/${columnName}`;

    if (subFolder) prefix = `${prefix}/${subFolder}`;

    return this.storage.objects
      .list({
        auth,
        bucket: bucketName,
        prefix,
      })
      .then((response) =>
        response.data.items?.map(
          (item) =>
            `https://storage.cloud.google.com/${bucketName}/${item.name}`,
        ),
      );
  }
}
