import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BigQueryService } from './bigquery.service';
import { BigQueryTablesResolver } from './bigquery-tables.resolver';
import { BigQueryTableDataResolver } from './bigquery-tabledata.resolver';
import { BigQueryTableInfoResolver } from './bigquery-tableinfo.resolver';
import { BigQueryProjectsResolver } from './bigquery-projects.resolver';

@Module({
  imports: [UsersModule],
  providers: [
    BigQueryService,
    BigQueryProjectsResolver,
    BigQueryTablesResolver,
    BigQueryTableDataResolver,
    BigQueryTableInfoResolver,
  ],
})
export class BigqueryModule {}
