import { DataModule } from '@jbhive_be/data';
import { LogModule } from 'libs/utils/log/backend/src';
import { Module } from '@nestjs/common'
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  imports: [DataModule, LogModule],
  controllers: [],
  providers: [AdminResolver, AdminService],
  exports: [],
})
export class AdminModule {}
