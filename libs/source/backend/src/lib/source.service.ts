import { User } from "@jbhive/auth_be";
import { UserService } from "@jbhive/user_be";
import { LogService } from "@jbhive/log_be";
import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ForbiddenError } from "apollo-server-express";
import { CreateSourceInput } from "./dto/create-source-input";
import { CreateSourceTypeInput } from "./dto/create-source-type-input";
import { CreateTagInput } from "./dto/create-tag-input";
import { UpdateSourceInput } from "./dto/update-source-input";
import { UpdateSourceTypeInput } from "./dto/update-source-type-input";
import { UpdateTagInput } from "./dto/update-tag-input";

import { ConfigService } from "@nestjs/config";
import { Prisma, PrismaClient, Tag } from "@prisma/client";
import { SourcePrismaIncludes } from "./source-prisma-includes";
import { roles_dataset, users_dataset, tags_dataset, types_dataset, Role } from "@jbhive/types_be";

@Injectable()
export class SourceService extends PrismaClient implements OnModuleInit, OnModuleDestroy {


    constructor(private readonly data: UserService, private readonly log: LogService) {
        super()
    }

    async onModuleInit() {
        await this.$connect()
        this.ensureDbIsInitialized()
    }

    async ensureDbIsInitialized() {
        Logger.log(`Check if DB need to load a default dataset..`)
        await this.data.ensureRolesExist()
        await this.data.ensureAdminUserExists()
        await this.ensureTagsExist()
        await this.ensureTypesExist()

    }

    async onModuleDestroy() {
        await this.$disconnect()
    }

    async findSource(id: number) {
        const source = await this.source.findUnique({
            where: {
                id
            },
            include: SourcePrismaIncludes.sourceIncludes
        })

        if (!source) {
            throw new NotFoundException(`Source ${id} not found`)
        }

        // Map the tags
        const result = { ...source, tags: source.tags.map(tag => tag.tag) }
        return result
    }

    async findSources() {
        const allSources = await this.source.findMany({ include: SourcePrismaIncludes.sourceIncludes })

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
            include: SourcePrismaIncludes.sourceIncludes
        })

        if (!allSources || allSources.length === 0) {
            throw new NotFoundException(`No source found`)
        }

        const result = allSources.map(source => {
            return { ...source, tags: source.tags.map(tag => tag.tag) }
        })
        return result
    }

    async findSourcesWherePublicOrOwnerId(userId: number) {
        const allSources = await this.source.findMany({
            where: {
                OR:[
                    {ownerId: userId},
                    {public: true}
                ]                               
            },
            include: SourcePrismaIncludes.sourceIncludes
        })
        
        if (!allSources || allSources.length === 0) {
            throw new NotFoundException(`No source found`)
        }

        const result = allSources.map(source => {
            return { ...source, tags: source.tags.map(tag => tag.tag) }
        })
        return result
    }

    async findSourceWhereOwnerId(userId: number, sourceId: number) {
        const allSources = await this.source.findMany({
            where: {
                id: sourceId,
                ownerId: userId
            },
            include: SourcePrismaIncludes.sourceIncludes
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
            include: SourcePrismaIncludes.sourceIncludes
        })

        if (!allSources || allSources.length === 0) {
            throw new NotFoundException(`No source found`)
        }

        const result = allSources.map(source => {
            return { ...source, tags: source.tags.map(tag => tag.tag) }
        })
        return result
    }


    async createSource(userId: number, typeId: number, tagsIds: number[], input: CreateSourceInput) {
        const userFound = await this.data.findUserById(userId)
        if (!userFound) {
            // this.log.err(`user ${userId} not found, can"t create the source: ${JSON.stringify(input)}`)
            throw new NotFoundException(`user ${userId} not found, can"t create the source: ${JSON.stringify(input)}`);
        }

        if (!this.notEmptyAndWithMinimumSize(input.title, 2)){
            throw new BadRequestException(`Can't create source, title must be set and 2 characters longs at least`)
        }

        const created = await this.source.create({
            data: {
                ...input,
                type: { connect: { id: typeId } },
                owner: { connect: { id: userId } }
            }
        })

        this.manageReccordAssignementForSourceTag(created.id, tagsIds)
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



    findTagById(tagId: number) {
        return this.tag.findUnique({
            where: {
                id: tagId
            }
        })
    }

    findTagByTitle(title: string) {
        return this.tag.findUnique({
            where: {
                title: title
            }
        })
    }

    findTag(id: number) {
        return this.tag.findUnique({
            where: {
                id
            },
            include: SourcePrismaIncludes.tagIncludes
        })
    }

    findTags() {
        return this.tag.findMany({ include: SourcePrismaIncludes.tagIncludes })
    }

    findTagByIds(tags: number[]) {
        return this.tag.findMany({
            where: {
                id: { in: tags }
            }
        })
    }

    async createTag(userId: number, input: CreateTagInput) {

        if (!this.notEmptyAndWithMinimumSize(input.title, 3)){
            throw new BadRequestException(`Can't create tag, title must be set and 3 characters longs at least`)
        }

        if (!this.notEmptyAndWithMinimumSize(input.description, 6)){
            throw new BadRequestException(`Can't create tag, description must be set and 6 characters longs at least`)
        }

        const userFound = await this.data.findUserById(userId)
        if (!userFound) {
            // this.log.err(`user ${userId} not found, can"t create the tag: ${JSON.stringify(input)}`)
            throw new NotFoundException(`User ${userId} not found, can"t create the tag: ${JSON.stringify(input)}`);
        }

        const tagFound = await this.findTagByTitle(input.title)
        if (tagFound) {
            // this.log.err(`user ${userId} not found, can"t create the tag: ${JSON.stringify(input)}`)
            throw new ForbiddenException(`Tag ${input.title} already exists}`);
        }

        const created = await this.tag.create({
            data: {
                ...input,
                author: { connect: { id: userId } }
            }
        })

        const createTagFound = await this.findTag(created.id)
        return createTagFound
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
        if (!this.notEmptyAndWithMinimumSize(input.title, 2)){
            throw new BadRequestException(`Can't create source type, title must be set and 2 characters longs at least`)
        }

        if (!this.notEmptyAndWithMinimumSize(input.description, 6)){
            throw new BadRequestException(`Can't create source type, description must be set and 6 characters longs at least`)
        }

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


    /*********************************
     *  UTILS
     * 
     *********************************/
    //  private async ensureRolesExist() {
    //     const found = await this.findRoleById(0)
    //     if (found) {
    //         return true
    //     }
    //     Logger.debug(`Initialize Roles..`)
    //     // create roles
    //     for (var role of roles_dataset) {
    //         await this.createRole({ id: role.id, name: role.name, description: role.description })
    //     }
    // }

    // private async ensureAdminUserExists() {
    //     const found = await this.data.findUserByEmail(this.default_admin.email)
    //     if (found) {
    //         return true
    //     }
    //     Logger.debug(`Initialize Admin user AIGHT..`)
    //     const created = await this.data.createActivatedUser(this.default_admin)
        
    //     for (var user of users_dataset) {
    //         Logger.debug(`Initialize Admin user..`)
    //         await this.data.createActivatedUser({ email: user.email, nickname: user.nickname, pseudo: user.pseudo, password: this.default_admin.password, roleId: user.roleId })
    //     }

    // }

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


    private notEmptyAndWithMinimumSize(value: string, minimalSize: number) {
        if (value === null || value.trim().length === 0 || value.length < minimalSize){
            return false
        } else {
            return true
        }
    }

}