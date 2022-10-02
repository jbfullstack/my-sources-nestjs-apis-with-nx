import { DataService } from "@jbhive_be/data";
import { LogService } from "libs/utils/log/backend/src";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateCourseInput } from "./dto/create-course.input";
import { CreateLessonInput } from "./dto/create-lesson.input";
import { UpdateCourseInput } from "./dto/update-course.input";
import { UpdateLessonInput } from "./dto/update-lesson.input";

@Injectable()
export class CourseService {
    // private readonly courseIncludes = {
    //     author: {
    //         select: {
    //             role: true
    //         }
    //     },
    //     lessons: true,
    // }

    constructor(private readonly data: DataService, private readonly log: LogService) { }

    courses() {
        return this.data.findCourses()
    }

    async course(id: number) {
        const found = await this.data.findCourse(id)

        if (!found){
            this.log.err(`Course with id ${id} not found`)
            throw new NotFoundException(`Course with id ${id} not found`)
        }

        return found
    }

    createCourse(userId: number, input: CreateCourseInput) {
        return this.data.createCourse(userId, input)
    }

    async updateCourse(userId: number, id: number, input: UpdateCourseInput) {
        const course = await this.course(id);        
        return this.data.updateCourse(userId, course.id, input)
    }

    deleteCourse(userId: number, id: number) {
        return this.data.deleteCourse(userId, id)
    }



    async createLesson(userId: number, courseId: number, input: CreateLessonInput) {   
        const course = await this.course(courseId)
        return this.data.createLesson(userId, course.id, input)
    }

    updateLesson(userId: number, id: number, input: UpdateLessonInput) {
        return this.data.updateLesson(userId, id, input)
    }

    async deleteLesson(userId: number, id: number) {
        return this.data.deleteLesson(userId, id)
    }
}