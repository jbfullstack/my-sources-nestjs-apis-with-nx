
import { Args, Query, Resolver, Mutation,  } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common'
import { CtxUser, GqlAuthGuard, Public, Roles, RolesGuard, User } from '@jbhive/auth_be'
import { Role } from "@jbhive/types_be";
import { LogService } from 'libs/utils/log/backend/src';
import { SourceService } from '../source.service';
import { Source } from '../models/source';
import { CreateSourceInput } from '../dto/create-source-input';
import { CreateTagInput } from '../dto/create-tag-input';
import { Tag } from '../models/tag';
import { UpdateSourceInput } from '../dto/update-source-input';

@UseGuards(RolesGuard)
@Resolver()
export class SourceResolver {
    constructor(private readonly service: SourceService, private readonly log: LogService) {}

    @Roles(Role.Admin, Role.Astek)
    @Query( () => [Source], {nullable: true})
    sources () {
        return this.service.findSources()
    }

    @Query( () => [Source], {nullable: true})
    sourcesOwned (@CtxUser() user: User) {
        return this.service.findSourcesWhereOwnerId(user.id)
    }

    @Query( () => [Source], {nullable: true})
    sourcesPublicOrOwned (@CtxUser() user: User) {
        return this.service.findSourcesWherePublicOrOwnerId(user.id)
    }

    @Public()
    @Query( () => [Source], {nullable: true})
    sourcesPublic () {
        return this.service.findSourcesPublic()
    }

    @Roles(Role.Admin, Role.Astek)
    @Query( () => Source, {nullable: true})
    source (@Args('id') id: number) {
        return this.service.findSource(id)
    }

    @Roles(Role.Admin, Role.Astek)
    @Query( () => Source, {nullable: true})
    sourceOwned (@CtxUser() user: User, @Args('id') id: number) {
        return this.service.findSourceWhereOwnerId(user.id, id)
    }

    @Mutation( () => Source, {nullable: true})
    async createSource(
        @CtxUser() user: User,
        @Args('typeId') typeId: number,
        @Args({ name: 'tagIds', type: () => [Number] }) tagIds: number[],
        @Args('input') input: CreateSourceInput)  {
        this.log.logMethod(`Resolver.createSource(${JSON.stringify(input)})`)
        return this.service.createSource(user.id, typeId, tagIds, input)
    }

    @Roles(Role.Admin, Role.Astek)
    @Mutation( () => Source, {nullable: true})
    async updateSource(
        @CtxUser() user: User,
        @Args('id') id: number,
        @Args('input') input: UpdateSourceInput)  {
            this.log.logMethod(`Resolver.updateSource(${JSON.stringify(input)})`)
            return this.service.updateSource(user.id, id, input)
    }

    @Mutation( () => Source, {nullable: true})
    async updateSourceOwned(
        @CtxUser() user: User,
        @Args('id') id: number,
        @Args('input') input: UpdateSourceInput)  {
            this.log.logMethod(`Resolver.updateSourceOwned(${JSON.stringify(input)})`)
            return this.service.updateSourceOwned(user.id, id, input)
    }

    @Roles(Role.Admin, Role.Astek)
    @Mutation( () => Boolean, {nullable: true})
    async deleteSource(
        @CtxUser() user: User,
        @Args('id') id: number)  {
            this.log.logMethod(`Resolver.deleteSource(${id})`)
            return await this.service.deleteSource(user.id, id)
    }

    @Mutation( () => Boolean, {nullable: true})
    async deleteSourceOwned(
        @CtxUser() user: User,
        @Args('id') id: number)  {
            this.log.logMethod(`Resolver.deleteSource(${id})`)
            return await this.service.deleteSourceOwned(user.id, id)
    }

    @Roles(Role.Admin)
    @Mutation( () => Boolean, {nullable: true})
    async deleteSources(
        @CtxUser() user: User)  {
            this.log.logMethod(`Resolver.deleteSources()`)
            return await this.service.deleteSources(user.id)
    }
}