import { Module } from '@nestjs/common'
import { DataService } from './data.service';
import { AuthModule } from '@jbhive/auth';
import { StructModule } from '@jbhive/struct';


@Module({
  imports: [StructModule],
  controllers: [],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}