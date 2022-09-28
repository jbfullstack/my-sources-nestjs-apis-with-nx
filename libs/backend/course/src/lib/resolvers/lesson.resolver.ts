import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { CourseService } from '../course.service';
import { CreateLessonInput } from '../dto/create-lesson.input';
import { Lesson } from '../models/lesson';

import { Logger, UseGuards } from '@nestjs/common'
import { UpdateLessonInput } from '../dto/update-lesson.input';
import { CtxUser, GqlAuthGuard, Public, Roles, RolesGuard } from '@jbhive/auth';
import { User } from '@prisma/client';
// import { Role } from '@jbhive/auth';
import { Role } from "@jbhive/struct";

@Resolver()
@UseGuards(RolesGuard)
export class LessonResolver {

    constructor(private readonly service: CourseService) {}

    @Roles(Role.Admin, Role.Astek)
    @Mutation( () => Lesson, {nullable: true})
    createLesson(
        @CtxUser() user: User,
        @Args('courseId') courseId: number, 
        @Args('input') input: CreateLessonInput
    ) {
        // Logger.log(`Resolver.createLesson( courseId: ${courseId}, input: ${JSON.stringify(input)}) -> requested by user ${user.pseudo}`)
        return this.service.createLesson(user.id, courseId, input)
    }

    @Mutation( () => Lesson, {nullable: true})
    updateLesson(
        @CtxUser() user: User,
        @Args('id') id: number, 
        @Args('input') input: UpdateLessonInput
    ) {
        // Logger.log(`Resolver.updateLesson( id: ${id}, input: ${JSON.stringify(input)})`)
        return this.service.updateLesson(user.id, id, input)
    }

    @Mutation( () => Boolean, {nullable: true})
    deleteLesson(
        @CtxUser() user: User,
        @Args('id') id: number
    ) {
        // Logger.log(`Resolver.deleteLesson( id: ${id}`)
        return this.service.deleteLesson(user.id, id)
    }
}