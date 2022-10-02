import { UserModule } from '@jbhive/user_be';
import { LogModule } from '@jbhive/log_be';
import { Module } from '@nestjs/common'
import { SourceTypeResolver } from './resolvers/source-type.resolver';
import { SourceResolver  } from './resolvers/source.resolver';
import { TagResolver } from './resolvers/tag.resolver';
import { SourceService } from './source.service';

@Module({
  imports: [UserModule, LogModule],
  controllers: [],
  providers: [SourceService, TagResolver, SourceTypeResolver, SourceResolver],
  exports: [],
})
export class SourceModule {}
