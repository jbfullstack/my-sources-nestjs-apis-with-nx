import { Injectable, OnModuleInit, OnModuleDestroy, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma, PrismaClient, Tag } from "@prisma/client";
// import { JwtDto } from "libs/auth/src/lib/dto/jwt.dto";
import { roles_dataset, users_dataset, tags_dataset, types_dataset, Role } from "@jbhive_be/struct";
import { CreateCourseInput, UpdateCourseInput, CreateLessonInput, UpdateLessonInput } from "@jbhive_be/course";
import { CreateSourceInput, UpdateSourceInput, CreateSourceTypeInput, UpdateSourceTypeInput, CreateTagInput, UpdateTagInput } from "@jbhive_be/source"

import { PrismaIncludes } from "../prisma-includes";
import { LogService } from "@jbhive_be/log";
import { ForbiddenError } from "apollo-server-express";
import { UpdateUserInput } from "@jbhive_be/admin";
import { CryptHelper } from "@jbhive_be/crypt";


@Injectable()
export class DataService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    private default_admin: {
        email: string,
        password: string,
        pseudo: string,
        roleId: number
    }

    constructor(private readonly config: ConfigService) {
        super()

        this.default_admin = {
            email: this.config.get('admin_email'),
            password: this.config.get('admin_password'),
            pseudo: this.config.get('admin_pseudo'),
            roleId: this.config.get('admin_role_id'),
        }
    }

    async onModuleInit() {
        await this.$connect()
        await this.ensureDbIsInitialized()

    }

    async ensureDbIsInitialized() {
        Logger.log(`Check if DB need to load a default dataset..`)
        await this.ensureRolesExist()
        await this.ensureAdminUserExists()
        await this.ensureTagsExist()
        await this.ensureTypesExist()

    }

    async onModuleDestroy() {
        await this.$disconnect()
    }

    /*********************************
     *  USERS & ROLES
     * 
     *********************************/

    async createUser({ email, password, pseudo, roleId }: { email: string, password: string, pseudo: string, roleId: number }) {
        // Comming from PrsimaClient
        const created = await this.user.create({
            data: {
                email,
                password,
                pseudo,
                roleId: +roleId,
                hidden: false,  // TIODO admin manage hidden & activated
                activated: true,
                token: ''
            }
        })
        return created
    }

    async createActicatedUser({ email, password, pseudo, roleId }: { email: string, password: string, pseudo: string, roleId: number }) {
        // Comming from PrsimaClient
        const created = await this.user.create({
            data: {
                email,
                password,
                pseudo,
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



    /*********************************
     *  SOURCES
     * 
     *********************************/

    async findSource(id: number) {
        const source = await this.source.findUnique({
            where: {
                id
            },
            include: PrismaIncludes.sourceIncludes
        })

        if (!source) {
            throw new NotFoundException(`Source ${id} not found`)
        }

        // Map the tags
        const result = { ...source, tags: source.tags.map(tag => tag.tag) }
        return result
    }

    async findSources() {
        const allSources = await this.source.findMany({ include: PrismaIncludes.sourceIncludes })

        if (!allSources || allSources.length === 0) {
            throw new NotFoundException(`No source found`)
        }

        // Map the tags
        const result = allSources.map(source => {
            return { ...source, tags: source.tags.map(tag => tag.tag) }
        })
        return result
    }

    async findSourcesWhereOwnerId(userId: number) {
        const allSources = await this.source.findMany({
            where: {
                ownerId: userId
            },
            include: PrismaIncludes.sourceIncludes
        })

        if (!allSources || allSources.length === 0) {
            throw new NotFoundException(`No source found`)
        }

        const result = allSources.map(source => {
            return { ...source, tags: source.tags.map(tag => tag.tag) }
        })
        return result
    }

    async findSourcesPublic() {
        const allSources = await this.source.findMany({
            where: {
                public: true
            },
            include: PrismaIncludes.sourceIncludes
        })

        if (!allSources || allSources.length === 0) {
            throw new NotFoundException(`No source found`)
        }

        const result = allSources.map(source => {
            return { ...source, tags: source.tags.map(tag => tag.tag) }
        })
        return result
    }

    async createSource(userId: number, typeId: number, tags: number[], input: CreateSourceInput) {
        const userFound = await this.findUserById(userId)
        if (!userFound) {
            // this.log.err(`user ${userId} not found, can"t create the source: ${JSON.stringify(input)}`)
            throw new NotFoundException(`user ${userId} not found, can"t create the source: ${JSON.stringify(input)}`);
        }

        const created = await this.source.create({
            data: {
                ...input,
                type: { connect: { id: typeId } },
                owner: { connect: { id: userId } }
            }
        })

        this.manageReccordAssignementForSourceTag(created.id, tags)
        return created
    }

    async updateSource(userId: number, sourceId: number, input: UpdateSourceInput) {
        const typeId = input?.typeId
        delete input.typeId
        const tagIds = input?.tagIds
        delete input.tagIds

        let data
        if (typeId) {
            data = {
                ...input,
                type: { connect: { id: typeId } }
            }
        } else {
            data = { ...input }
        }

        const updatedSource = await this.source.update({
            where: { id: sourceId },
            data: data,
        })

        if (tagIds) {
            await this.manageReccordAssignementForSourceTag(sourceId, tagIds)
        }


        return updatedSource
    }

    async updateSourceOwned(userId: number, sourceId: number, input: UpdateSourceInput) {
        const found = await this.findSource(sourceId)
        if (!found) {
            throw new NotFoundException(`Can't performe update operation, source ${sourceId} not found`)
        }

        if (found.ownerId !== userId) {
            throw new ForbiddenError(`User ${userId} is not allowed to update source ${sourceId}`)
        }

        return await this.updateSource(userId, sourceId, input)
    }


    async deleteSource(userId: number, sourceId: number) {
        const deleted = await this.source.delete({
            where: {
                id: sourceId
            }
        })

        return !!deleted
    }

    async deleteSourceOwned(userId: number, sourceId: number) {
        const found = await this.findSource(sourceId)
        if (!found) {
            throw new NotFoundException(`Can't performe delete operation, source ${sourceId} not found`)
        }

        if (found.ownerId !== userId) {
            throw new ForbiddenError(`User ${userId} is not allowed to delte source ${sourceId}`)
        }

        const deleted = await this.deleteSource(userId, sourceId)
    }

    async deleteSources(userId: number) {
        const deleted = await this.source.deleteMany({})
        return deleted.count > 0
    }

    async manageReccordAssignementForSourceTag(sourceId: number, tags: number[]) {

        const source = await this.findSource(sourceId)
        this.removeOldReccordsForSourceTag(source, sourceId, tags)
        this.addNewReccordsForSourceTag(source, sourceId, tags)
        return true
    }
    async addNewReccordsForSourceTag(source: { tags: Tag[]; id: number; createdAt: Date; title: string; url: string; content: string; description: string; typeId: number; ownerId: number; owner: { id: number; pseudo: string; email: string; role: import(".prisma/client").Role; }; type: import(".prisma/client").SourceType; }, sourceId: number, tags: number[]) {
        // // News
        let assignements = []
        for (var tagId of tags) {
            let found: Boolean = false
            for (var tag of source.tags) {
                if (tagId === tag.id) {
                    found = true
                    break
                }
            }
            if (!found) {
                assignements = [
                    ...assignements,
                    {
                        sourceId: sourceId,
                        tagId: tagId
                    }
                ]
            }
        }
        const relationsCreated = await this.sourceTag.createMany({
            data: assignements
        })

    }

    async removeOldReccordsForSourceTag(source: { tags: Tag[]; id: number; createdAt: Date; title: string; url: string; content: string; description: string; typeId: number; ownerId: number; owner: { id: number; pseudo: string; email: string; role: import(".prisma/client").Role; }; type: import(".prisma/client").SourceType; }, sourceId: number, tags: number[]) {
        // Olds
        // let assignements = []
        let ids: number[] = []
        for (var tag of source.tags) {
            let found: Boolean = false
            for (var tagId of tags) {
                if (tagId === tag.id) {
                    found = true;
                    break
                }
            }
            if (!found) {
                ids.push(tag.id)
            }
        }

        for (var id of ids) {
            await this.sourceTag.delete({
                where: {
                    sourceId_tagId: {
                        sourceId: sourceId,
                        tagId: id
                    }

                }
            })
        }
    }

    findTagById(tagId: number) {
        return this.tag.findUnique({
            where: {
                id: tagId
            }
        })
    }

    findTag(id: number) {
        return this.tag.findUnique({
            where: {
                id
            },
            include: PrismaIncludes.tagIncludes
        })
    }

    findTags() {
        return this.tag.findMany({ include: PrismaIncludes.tagIncludes })
    }

    findTagByIds(tags: number[]) {
        return this.tag.findMany({
            where: {
                id: { in: tags }
            }
        })
    }

    async createTag(userId: number, input: CreateTagInput) {
        const userFound = await this.findUserById(userId)
        if (!userFound) {
            // this.log.err(`user ${userId} not found, can"t create the tag: ${JSON.stringify(input)}`)
            throw new NotFoundException(`User ${userId} not found, can"t create the tag: ${JSON.stringify(input)}`);
        }

        const created = await this.tag.create({
            data: {
                ...input,
                author: { connect: { id: userId } }
            }
        })

        return created
    }

    async updateTag(userId: number, id: number, input: UpdateTagInput) {
        return await this.tag.update({
            where: { id: id },
            data: { ...input }
        })
    }

    async updateTagOwned(userId: number, id: number, input: UpdateTagInput) {
        const found = await this.findTag(id)
        if (!found) {
            throw new NotFoundException(`Tag ${id} not found, can't update the tag ${id}`)
        }

        if (found.authorId !== userId) {
            throw new ForbiddenError(`User ${userId} not allowed to update tag ${id}`)
        }

        return await this.tag.update({
            where: { id: id },
            data: { ...input }
        })
    }




    async deleteTag(userId: number, id: number) {
        const deleted = await this.tag.delete({
            where: { id: id }
        })
        return !!deleted
    }

    findTypeById(id: number) {
        return this.sourceType.findUnique({
            where: {
                id: id
            }
        })
    }

    findSourceType(id: number) {
        return this.sourceType.findUnique({
            where: {
                id
            }
        })
    }

    findSourceTypes() {
        return this.sourceType.findMany()
    }

    async createSourceType(input: CreateSourceTypeInput) {
        return await this.sourceType.create({
            data: {
                ...input
            }
        })
    }

    updateSourceType(id: number, input: UpdateSourceTypeInput) {
        return this.sourceType.update({
            where: { id: id },
            data: { ...input }
        })
    }

    async deleteSourceType(id: number) {
        const deleted = await this.sourceType.delete({
            where: { id: id }
        })
        return !!deleted
    }



    /*********************************
     *  UTILS
     * 
     *********************************/
    private async ensureRolesExist() {
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

    private async ensureAdminUserExists() {
        const found = await this.findUserByEmail(this.default_admin.email)
        if (found) {
            return true
        }
        Logger.debug(`Initialize Admin user..`)
        const created = await this.createUser(this.default_admin)
        for (var user of users_dataset) {
            await this.createActicatedUser({ email: user.email, pseudo: user.pseudo, password: this.default_admin.password, roleId: user.roleId })
        }

    }

    private async ensureTagsExist() {
        const found = await this.findTagById(1)
        if (found) {
            return true
        }
        // create roles
        Logger.debug(`Initialize Tags..`)
        for (var tag of tags_dataset) {
            await this.createTag(1, { title: tag.title, description: tag.description })
        }
    }

    private async ensureTypesExist() {
        const found = await this.findTypeById(1)
        if (found) {
            return true
        }
        Logger.debug(`Initialize Types..`)
        // create roles
        for (var type of types_dataset) {
            await this.createSourceType({ title: type.title, description: type.description })
        }
    }
}