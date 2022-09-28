import { CoreModule } from '@jbhive/core'
import { CourseModule } from '@jbhive/course'
import { DataModule } from '@jbhive/data'
import { AuthModule } from '@jbhive/auth'
import { SourceModule } from '@jbhive/source'
import { AdminModule } from '@jbhive/admin'
import { CryptModule } from '@jbhive/crypt'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CoreModule, CourseModule, DataModule, AuthModule, SourceModule, AdminModule, CryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
