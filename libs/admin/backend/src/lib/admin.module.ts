import { UserModule } from '@jbhive/user_be';
import { LogModule } from '@jbhive/log_be';
import { Module } from '@nestjs/common'
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  imports: [UserModule, LogModule],
  controllers: [],
  providers: [AdminResolver, AdminService],
  exports: [],
})
export class AdminModule {}
