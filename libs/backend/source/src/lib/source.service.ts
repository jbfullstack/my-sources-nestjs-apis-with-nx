import { User } from "@jbhive_be/auth";
import { DataService } from "@jbhive_be/data";
import { LogService } from "@jbhive_be/log";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ForbiddenError } from "apollo-server-express";
import { CreateSourceInput } from "./dto/create-source-input";
import { CreateSourceTypeInput } from "./dto/create-source-type-input";
import { CreateTagInput } from "./dto/create-tag-input";
import { UpdateSourceInput } from "./dto/update-source-input";
import { UpdateSourceTypeInput } from "./dto/update-source-type-input";
import { UpdateTagInput } from "./dto/update-tag-input";

@Injectable()
export class SourceService {


    constructor(private readonly data: DataService, private readonly log: LogService) { }

    sources() {
        return this.data.findSources()
    }

    sourcesOwned(userId: number) {
        return this.data.findSourcesWhereOwnerId(userId)
    }

    async sourceOwned(userId: number, id: number) {
        const source = await this.data.findSource(id)
        if (source?.ownerId !== userId) {
            throw new ForbiddenError(`User ${userId} us not allowed to access source ${id}`)
        }
        return source
    }

    sourcesPublic() {
        return this.data.findSourcesPublic()
    }

    source(id: number) {
        return this.data.findSource(id)
    }

    async createSource(userId: number, typeId: number, tagsIds: number[], input: CreateSourceInput) {
        return this.data.createSource(userId, typeId, tagsIds, input)
    }

    async updateSource(userId: number, id: number, input: UpdateSourceInput) {
        return this.data.updateSource(userId, id, input)
    }

    async updateSourceOwned(userId: number, sourceId: number, input: UpdateSourceInput) {
        return this.data.updateSourceOwned(userId, sourceId, input)
    }

    async deleteSource(userId: number, id: number) {
        return this.data.deleteSource(userId, id)
    }

    async deleteSourceOwned(userId: number, id: number) {
        return this.data.deleteSourceOwned(userId, id)
    }

    async deleteSources(userId: number) {
        return this.data.deleteSources(userId)
    }



    tags() {
        return this.data.findTags()
    }

    tag(id: number) {
        return this.data.findTag(id)
    }

    async createTag(userId: number, input: CreateTagInput) {
        return this.data.createTag(userId, input)
    }

    async updateTag(userId: number, id: number, input: UpdateTagInput) {
        return this.data.updateTag(userId, id, input)
    }

    async updateTagOwned(userId: number, id: number, input: UpdateTagInput) {
        return this.data.updateTagOwned(userId, id, input)
    }



    async deleteTag(userId: number, id: number) {
        return this.data.deleteTag(userId, id)
    }

    types() {
        return this.data.findSourceTypes()
    }

    type(id: number) {
        return this.data.findSourceType(id)
    }

    async createType(userId: number, input: CreateSourceTypeInput) {
        return this.data.createSourceType(input)
    }

    async updateType(userId: number, id: number, input: UpdateSourceTypeInput) {
        return this.data.updateSourceType(id, input)
    }

    async deleteType(userId: number, id: number) {
        return this.data.deleteSourceType(id)
    }

}