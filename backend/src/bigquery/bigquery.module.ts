import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BigQueryDatasetsResolver } from './bigquery-datasets.resolver';
import { BigQueryProjectsResolver } from './bigquery-projects.resolver';

@Module({
  imports: [UsersModule],
  providers: [BigQueryProjectsResolver, BigQueryDatasetsResolver],
})
export class BigqueryModule {}
