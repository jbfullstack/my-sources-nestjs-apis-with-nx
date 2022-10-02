import { Module } from '@nestjs/common'
import { DataService } from './data.service';
import { AuthModule } from '@jbhive/auth_be';
import { StructModule } from '@jbhive/types_be';


@Module({
  imports: [StructModule],
  controllers: [],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}