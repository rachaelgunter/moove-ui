import { HttpService, Injectable, Logger } from '@nestjs/common';
import { BigQueryPreviewHeaders } from 'src/bigquery/bigquery.types';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DatasourceValidationError } from 'src/errors/datasource-validation-error';

/**
 * TODO: Move all dataset-creation related logic to this service
 */

@Injectable()
export class DatasetsCreationService {
  private readonly logger = new Logger(DatasetsCreationService.name);
  private readonly auth = new google.auth.GoogleAuth();

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRequestHeaders(url: string): Promise<{ [index: string]: string }> {
    const client = await this.auth.getIdTokenClient(url);
    return client.getRequestHeaders(url);
  }

  async getValidatedCsvColumns(
    organizationName: string,
    analysisName: string,
    fileName: string,
  ): Promise<BigQueryPreviewHeaders[]> {
    const validatorURL = this.configService.get(
      'CSV_VALIDATOR_CLOUD_FUNCTION_URL',
    );
    const headers = await this.getRequestHeaders(validatorURL);

    this.logger.log(
      `Starting validation for CSV: ${organizationName}/${analysisName}/${fileName}`,
    );

    return this.httpService
      .post(
        validatorURL,
        {
          organizationName,
          analysisName,
          fileName,
        },
        { headers },
      )
      .pipe(
        map(({ data }) => data.columns),
        tap(() =>
          this.logger.log(
            `Validation for CSV: ${organizationName}/${analysisName}/${fileName} completed`,
          ),
        ),
        catchError((err) =>
          throwError(new DatasourceValidationError(err.response.data.error)),
        ),
      )
      .toPromise();
  }
}
