import { DataModule } from '@jbhive_be/data';
import { LogModule } from 'libs/utils/log/backend/src';
import { Module } from '@nestjs/common'
import { SourceTypeResolver } from './resolvers/source-type.resolver';
import { SourceResolver  } from './resolvers/source.resolver';
import { TagResolver } from './resolvers/tag.resolver';
import { SourceService } from './source.service';

@Module({
  imports: [DataModule, LogModule],
  controllers: [],
  providers: [SourceService, TagResolver, SourceTypeResolver, SourceResolver],
  exports: [],
})
export class SourceModule {}
