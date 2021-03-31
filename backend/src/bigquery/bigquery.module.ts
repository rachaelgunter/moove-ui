import { HttpModule, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BigQueryService } from './bigquery.service';
import { BigQueryTablesResolver } from './bigquery-tables.resolver';
import { BigQueryTableDataResolver } from './bigquery-tabledata.resolver';
import { BigQueryTableInfoResolver } from './bigquery-tableinfo.resolver';
import { BigQueryProjectsResolver } from './bigquery-projects.resolver';
import { BigQueryPreviewResolver } from './bigquery-preview.resolver';
import { BigqueryClientService } from './bigquery-client/bigquery-client.service';

@Module({
  imports: [UsersModule, HttpModule],
  providers: [
    BigQueryService,
    BigqueryClientService,
    BigQueryProjectsResolver,
    BigQueryTablesResolver,
    BigQueryTableDataResolver,
    BigQueryTableInfoResolver,
    BigQueryPreviewResolver,
  ],
})
export class BigqueryModule {}
