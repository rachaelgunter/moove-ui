import { HttpModule, Module } from '@nestjs/common';
import { DatasetsResolver } from './datasets.resolver';
import { DatasetsService } from './datasets.service';

@Module({
  imports: [HttpModule],
  providers: [DatasetsResolver, DatasetsService],
})
export class DatasetsModule {}
