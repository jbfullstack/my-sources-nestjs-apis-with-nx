import { Module } from '@nestjs/common'
import { UserService } from './user.service';
import { StructModule } from '@jbhive/types_be';


@Module({
  imports: [StructModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}