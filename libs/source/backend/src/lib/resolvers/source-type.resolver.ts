
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common'
import { CtxUser, GqlAuthGuard, Public, Roles, RolesGuard, User } from '@jbhive/auth_be'
import { Role } from "@jbhive/types_be";
import { LogService } from 'libs/utils/log/backend/src';
import { SourceService } from '../source.service';
import { SourceType } from '../models/source-type';
import { CreateSourceTypeInput } from '../dto/create-source-type-input';
import { UpdateSourceTypeInput } from '../dto/update-source-type-input';

@UseGuards(RolesGuard)
@Resolver()
export class SourceTypeResolver {
    constructor(private readonly service: SourceService, private readonly log: LogService) {}

    @Query( () => [SourceType], {nullable: true})
    types () {
        this.log.logMethod(`Resolver.types()`)
        return this.service.findSourceTypes()
    }

    @Query( () => SourceType, {nullable: true})
    type (@Args('id') id: number) {
        this.log.logMethod(`Resolver.type()`)
        return this.service.findSourceType(id)
    }

    @Roles(Role.Admin, Role.Astek)
    @Mutation( () => SourceType, {nullable: true})
    async createType (
        @CtxUser() user: User,
        @Args('input') input: CreateSourceTypeInput) {
        this.log.logMethod(`Resolver.createType()`)
        return await this.service.createSourceType(input)
    }

    @Roles(Role.Admin, Role.Astek)
    @Mutation( () => SourceType, {nullable: true})
    updateType (
        @CtxUser() user: User,        
        @Args('id') id: number,
        @Args('input') input: UpdateSourceTypeInput) {
        this.log.logMethod(`Resolver.updateType()`)
        return this.service.updateSourceType(id, input)
    }

    @Roles(Role.Admin, Role.Astek)
    @Mutation( () => Boolean, {nullable: true})
    deleteType (
        @CtxUser() user: User,        
        @Args('id') id: number) {
        this.log.logMethod(`Resolver.deleteType()`)
        return this.service.deleteSourceType(id)
    }
}