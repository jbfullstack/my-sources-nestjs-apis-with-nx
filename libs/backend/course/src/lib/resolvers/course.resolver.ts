
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { CourseService } from '../course.service';
import { CreateCourseInput } from '../dto/create-course.input';
import { Course } from '../models/course';
import { Logger, UseGuards } from '@nestjs/common'
import { CtxUser, GqlAuthGuard, Public, User } from '@jbhive/auth_be'
import { UpdateCourseInput } from '../dto/update-course.input';
import { LogService } from 'libs/utils/log/backend/src';

@Resolver()
export class CourseResolver {
    constructor(private readonly service: CourseService, private readonly log: LogService) {}

    @Public()
    @Query( () => [Course], {nullable: true})
    courses () {
        this.log.logMethod(`Resolver.courses()`)
        return this.service.courses()
    }

    @Query( () => Course, {nullable: true})
    course (@Args('id') id: number)  {
        this.log.logMethod(`Resolver.course(${id})`)
        return this.service.course(id)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation( () => Course, {nullable: true})
    async createCourse(
        @CtxUser() user: User,
        @Args('input') input: CreateCourseInput)  {
        this.log.logMethod(`Resolver.createCourse(${JSON.stringify(input)})`)
        return this.service.createCourse(user.id, input)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation( () => Course, {nullable: true})
    updateCourse(
        @CtxUser() user: User,
        @Args('id') id: number, 
        @Args('input') input: UpdateCourseInput
    )  {
        this.log.logMethod(`Resolver.updateCourse(${JSON.stringify(input)})`)
        return this.service.updateCourse(user.id, id, input)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation( () => Boolean, {nullable: true})
    deleteCourse(
        @CtxUser() user: User,
        @Args('id') id: number
    ) {
        this.log.logMethod(`Resolver.deleteCourse(${id})`)
        return this.service.deleteCourse(user.id, id)
    }
}