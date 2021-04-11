import { storage_v1, google } from 'googleapis';
import { GoogleClientService } from 'src/google-client/google-client.service';
import { Storage } from '@google-cloud/storage';
import { Logger } from '@nestjs/common';

export class GCSClient extends GoogleClientService {
  private storage: storage_v1.Storage = google.storage('v1');
  private gcsStorage = new Storage();
  private logger = new Logger(GCSClient.name);

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

  async generateUploadSignedURL(fileName: string): Promise<string> {
    const DATASETS_FILES_BUCKET = process.env.DATASETS_FILES_BUCKET;
    const [url] = await this.gcsStorage
      .bucket(DATASETS_FILES_BUCKET)
      .file(fileName)
      .getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: 'application/octet-stream',
      });

    this.logger.log(`Generated PUT signed URL for file ${fileName}`);

    return Promise.resolve(url);
  }
}
