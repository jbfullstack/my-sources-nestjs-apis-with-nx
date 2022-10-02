import { Module } from '@nestjs/common'
import { CourseResolver } from './resolvers/course.resolver'
import { CourseService } from './course.service'
import { LessonResolver } from './resolvers/lesson.resolver'
import { UserModule } from '@jbhive/user_be'
import { LogModule } from '@jbhive/log_be'

@Module({   
  controllers: [],
  imports: [UserModule, LogModule],
  providers: [CourseResolver, CourseService, LessonResolver],
  exports: [],
})
export class CourseModule {}
