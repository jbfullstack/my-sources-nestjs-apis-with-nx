import { CoreModule } from '@jbhive/config_be'
import { CourseModule } from '@jbhive_be/course'
import { DataModule } from '@jbhive_be/data'
import { AuthModule } from '@jbhive/auth_be'
import { SourceModule } from 'libs/source/backend/src'
import { AdminModule } from '@jbhive/admin_be'
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
