import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BigQueryTablesResolver } from './bigquery-tables.resolver';
import { BigQueryProjectsResolver } from './bigquery-projects.resolver';

@Module({
  imports: [UsersModule],
  providers: [BigQueryProjectsResolver, BigQueryTablesResolver],
})
export class BigqueryModule {}
