import { Module } from '@nestjs/common'
import { CourseResolver } from './resolvers/course.resolver'
import { CourseService } from './course.service'
import { LessonResolver } from './resolvers/lesson.resolver'
import { DataModule } from '@jbhive/data'
import { LogModule } from '@jbhive/log'

@Module({   
  controllers: [],
  imports: [DataModule, LogModule],
  providers: [CourseResolver, CourseService, LessonResolver],
  exports: [],
})
export class CourseModule {}
