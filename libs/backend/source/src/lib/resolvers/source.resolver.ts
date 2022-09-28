
import { Args, Query, Resolver, Mutation,  } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common'
import { CtxUser, GqlAuthGuard, Public, Roles, RolesGuard, User } from '@jbhive_be/auth'
import { Role } from "@jbhive_be/struct";
import { LogService } from '@jbhive_be/log';
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
        return this.service.sources()
    }

    @Query( () => [Source], {nullable: true})
    sourcesOwned (@CtxUser() user: User) {
        return this.service.sourcesOwned(user.id)
    }

    @Public()
    @Query( () => [Source], {nullable: true})
    sourcesPublic () {
        return this.service.sourcesPublic()
    }

    @Roles(Role.Admin, Role.Astek)
    @Query( () => Source, {nullable: true})
    source (@Args('id') id: number) {
        return this.service.source(id)
    }

    @Roles(Role.Admin, Role.Astek)
    @Query( () => Source, {nullable: true})
    sourceOwned (@CtxUser() user: User, @Args('id') id: number) {
        return this.service.sourceOwned(user.id, id)
    }

    @Roles(Role.Admin, Role.Astek)
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

    @Roles(Role.Admin, Role.Astek)
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