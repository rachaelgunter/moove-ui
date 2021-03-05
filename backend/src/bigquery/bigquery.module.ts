import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BigQueryDatasetResolver, BigqueryResolver } from './bigquery.resolver';

@Module({
  imports: [UsersModule],
  providers: [BigqueryResolver, BigQueryDatasetResolver],
})
export class BigqueryModule {}
