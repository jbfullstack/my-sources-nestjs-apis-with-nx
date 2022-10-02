import { Injectable, OnModuleInit, OnModuleDestroy, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma, PrismaClient, Tag } from "@prisma/client";
// import { JwtDto } from "libs/auth/src/lib/dto/jwt.dto";
import { roles_dataset, users_dataset, tags_dataset, types_dataset, Role } from "@jbhive_be/struct";
import { CreateCourseInput, UpdateCourseInput, CreateLessonInput, UpdateLessonInput } from "@jbhive_be/course";
// import { CreateSourceInput, UpdateSourceInput, CreateSourceTypeInput, UpdateSourceTypeInput, CreateTagInput, UpdateTagInput } from "@jbhive_be/source"

import { PrismaIncludes } from "../prisma-includes";
import { LogService } from "@jbhive_be/log";
import { ForbiddenError } from "apollo-server-express";
import { UpdateUserInput } from "@jbhive_be/struct";
import { CryptHelper } from "@jbhive_be/crypt";


@Injectable()
export class DataService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    private default_admin: {
        email: string,
        password: string,
        pseudo: string,
        nickname: string,
        roleId: number
    }

    constructor(private readonly config: ConfigService) {
        super()

        this.default_admin = {
            email: this.config.get('admin_email'),
            password: this.config.get('admin_password'),
            pseudo: this.config.get('admin_pseudo'),
            nickname: this.config.get('admin_pseudo'),
            roleId: this.config.get('admin_role_id'),
        }
    }

    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }

    /*********************************
     *  USERS & ROLES
     * 
     *********************************/

    async createUser({ email, password, pseudo, roleId, nickname }: { email: string, password: string, pseudo: string, roleId: number, nickname: string }) {
        // Comming from PrsimaClient
        Logger.debug(`createUser`)
        const created = await this.user.create({
            data: {
                email,
                password,
                pseudo,
                nickname,
                roleId: +roleId,
                hidden: false,  // TIODO admin manage hidden & activated
                activated: true,
                token: ''
            }
        })
        return created
    }

    async createActivatedUser({ email, password, pseudo, roleId, nickname  }: { email: string, password: string, pseudo: string, roleId: number, nickname: string }) {
        // Comming from PrsimaClient
        Logger.debug(`createActivatedUser`)
        const created = await this.user.create({
            data: {
                email,
                password,
                pseudo,
                nickname,
                role: { connect : { id: +roleId}},
                hidden: false,  // TIODO admin manage hidden & activated
                activated: true,
                token: ''
            }
        })
        return created
    }

    

    async createRole({ id, name, description }: { id: number, name: string, description: string }) {
        // Comming from PrsimaClient
        const created = await this.role.create({
            data: {
                id,
                name,
                description
            }
        })

        return created
    }

    async findUser(userId: number) {
        return await this.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async updateRoleUser(userId: number, roleId: number) {
        // Update
        return this.user.update({
            where: { id: userId },
            data: { roleId }
        })
    }

    async updateUser(userId: number, input: UpdateUserInput) {

        let data = { ...input }
        if (input?.password) {
            data = {
                ...data,
                password: await CryptHelper.hash(input.password)
            }
        }

        return await this.user.update({
            where: { id: userId },
            data: data
        })
    }



    findUserByEmail(email: string) {
        return this.user.findUnique({
            where: { email },
            include: PrismaIncludes.userIncludes
        })
    }

    findUserById(userId: number) {
        return this.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    findUserByNickname(nickname: string) {
        return this.user.findUnique({
            where: { nickname },
            include: PrismaIncludes.userIncludes
        })
    }

    findUserByPseudo(pseudo: string) {
        return this.user.findUnique({
            where: { pseudo },
            include: PrismaIncludes.userIncludes
        })
    }

    findRoleById(roleId: number) {
        return this.role.findUnique({
            where: {
                id: roleId
            }
        })
    }





    /*********************************
     *  COURSES & LESSONS
     * 
     *********************************/

    findCourse(id: number) {
        return this.course.findUnique({
            where: { id },
            include: PrismaIncludes.coursesIncludes
        })
    }

    findCourses() {
        return this.course.findMany({ include: PrismaIncludes.coursesIncludes })
    }

    createCourse(userId: number, input: CreateCourseInput) {
        return this.course.create({
            data: {
                ...input,
                author: { connect: { id: userId } }
            },
        })
    }

    updateCourse(userId: number, id: number, input: UpdateCourseInput) {
        return this.course.update({
            where: { id },
            data: { ...input }
        })
    }

    async deleteCourse(userId: number, id: number) {
        const deleted = await this.course.delete({
            where: {
                id
            }
        })

        return !!deleted
    }


    async createLesson(userId: number, courseId: number, input: CreateLessonInput) {
        return this.lesson.create({
            data: {
                course: { connect: { id: courseId } },
                ...input
            }
        })
    }

    updateLesson(userId: number, id: number, input: UpdateLessonInput) {
        return this.lesson.update({
            where: { id: id },
            data: { ...input }
        })
    }

    async deleteLesson(userId: number, id: number) {
        const deleted = await this.lesson.delete({
            where: { id: id }
        })
        return !!deleted
    }   


    // /*********************************
    //  *  UTILS
    //  * 
    //  *********************************/
    async ensureRolesExist() {
        const found = await this.findRoleById(0)
        if (found) {
            return true
        }
        Logger.debug(`Initialize Roles..`)
        // create roles
        for (var role of roles_dataset) {
            await this.createRole({ id: role.id, name: role.name, description: role.description })
        }
    }

    async ensureAdminUserExists() {
        const found = await this.findUserByEmail(this.default_admin.email)
        if (found) {
            return true
        }
        Logger.debug(`Initialize Admin user AIGHT..`)
        const created = await this.createActivatedUser(this.default_admin)
        
        for (var user of users_dataset) {
            Logger.debug(`Initialize Admin user..`)
            await this.createActivatedUser({ email: user.email, nickname: user.nickname, pseudo: user.pseudo, password: this.default_admin.password, roleId: user.roleId })
        }

    }

    // private async ensureTagsExist() {
    //     const found = await this.findTagById(1)
    //     if (found) {
    //         return true
    //     }
    //     // create roles
    //     Logger.debug(`Initialize Tags..`)
    //     for (var tag of tags_dataset) {
    //         await this.createTag(1, { title: tag.title, description: tag.description })
    //     }
    // }

    // private async ensureTypesExist() {
    //     const found = await this.findTypeById(1)
    //     if (found) {
    //         return true
    //     }
    //     Logger.debug(`Initialize Types..`)
    //     // create roles
    //     for (var type of types_dataset) {
    //         await this.createSourceType({ title: type.title, description: type.description })
    //     }
    // }
}