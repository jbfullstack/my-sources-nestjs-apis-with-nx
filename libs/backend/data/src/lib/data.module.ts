import { Module } from '@nestjs/common'
import { DataService } from './data.service';
import { AuthModule } from '@jbhive_be/auth';
import { StructModule } from '@jbhive_be/struct';


@Module({
  imports: [StructModule],
  controllers: [],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}