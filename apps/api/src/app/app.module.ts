import { CoreModule } from '@jbhive_be/core'
import { CourseModule } from '@jbhive_be/course'
import { DataModule } from '@jbhive_be/data'
import { AuthModule } from '@jbhive_be/auth'
import { SourceModule } from '@jbhive_be/source'
import { AdminModule } from '@jbhive_be/admin'
import { CryptModule } from '@jbhive_be/crypt'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CoreModule, CourseModule, DataModule, AuthModule, SourceModule, AdminModule, CryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
