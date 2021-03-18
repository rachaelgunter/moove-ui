import { HttpModule, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { DatasetsResolver } from './datasets.resolver';
import { DatasetsService } from './datasets.service';

@Module({
  imports: [HttpModule, UsersModule],
  providers: [DatasetsResolver, DatasetsService],
})
export class DatasetsModule {}
