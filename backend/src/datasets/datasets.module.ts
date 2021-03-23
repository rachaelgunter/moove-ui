import { HttpModule, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { DatasetsResolver } from './datasets.resolver';
import { DatasetsService } from './datasets.service';
import { GCSClient } from 'src/gcs/gcs-client';

@Module({
  imports: [HttpModule, UsersModule],
  providers: [DatasetsResolver, DatasetsService, GCSClient],
})
export class DatasetsModule {}
