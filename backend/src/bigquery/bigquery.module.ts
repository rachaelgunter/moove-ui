import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BigqueryResolver } from './bigquery.resolver';

@Module({
  imports: [UsersModule],
  providers: [BigqueryResolver],
})
export class BigqueryModule {}
