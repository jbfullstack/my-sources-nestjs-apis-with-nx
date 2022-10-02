import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';

import { Logger, UseGuards } from '@nestjs/common'
import { CtxUser, GqlAuthGuard, Public, Roles, RolesGuard } from '@jbhive_be/auth';
import { User } from '@prisma/client';
// import { Role } from '@jbhive_be/auth';
import { Role } from "@jbhive_be/struct";
import { LogService } from '@jbhive_be/log';
import { CreateTagInput } from '../dto/create-tag-input';
import { Tag } from '../models/tag';
import { SourceService } from '../source.service';
import { UpdateTagInput } from '../dto/update-tag-input';

@UseGuards(RolesGuard)
@Resolver()
export class TagResolver {
    constructor(private readonly service: SourceService, private readonly log: LogService) {}

    
    @Query( () => [Tag], {nullable: true})
    tags () {
        return this.service.findTags()
    }
    
    @Query( () => Tag, {nullable: true})
    tag (@Args('id') id: number) {
        return this.service.findTag(id)
    }

    @Roles(Role.Admin, Role.Astek, Role.Lord, Role.Buddy)
    @Mutation( () => Tag, {nullable: true})
    async createTag(
        @CtxUser() user: User,
        @Args('input') input: CreateTagInput
    ) {
        return await this.service.createTag(user.id, input)
    }

    @Roles(Role.Admin, Role.Astek)
    @Mutation( () => Tag, {nullable: true})
    updateTag(
        @CtxUser() user: User,
        @Args('id') id: number, 
        @Args('input') input: UpdateTagInput
    ) {
        return this.service.updateTag(user.id, id, input)
    }

    @Mutation( () => Tag, {nullable: true})
    updateTagOwned(
        @CtxUser() user: User,
        @Args('id') id: number, 
        @Args('input') input: UpdateTagInput
    ) {
        return this.service.updateTagOwned(user.id, id, input)
    }

    @Roles(Role.Admin, Role.Astek)
    @Mutation( () => Boolean, {nullable: true})
    deleteTag(
        @CtxUser() user: User,
        @Args('id') id: number
    ) {
        return this.service.deleteTag(user.id, id)
    }
}