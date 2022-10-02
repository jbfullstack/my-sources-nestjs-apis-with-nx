import { CoreModule } from '@jbhive/config_be'
import { CourseModule } from '@jbhive_be/course'
import { UserModule } from '@jbhive/user_be'
import { AuthModule } from '@jbhive/auth_be'
import { SourceModule } from '@jbhive/source_be'
import { AdminModule } from '@jbhive/admin_be'
import { CryptModule } from '@jbhive/crypt'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CoreModule, CourseModule, UserModule, AuthModule, SourceModule, AdminModule, CryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
