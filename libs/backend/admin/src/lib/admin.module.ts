import { DataModule } from '@jbhive/data';
import { LogModule } from '@jbhive/log';
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
