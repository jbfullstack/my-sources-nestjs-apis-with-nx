
import { Args, Query, Resolver, Mutation,  } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common'
import { CtxUser, GqlAuthGuard, Public, Roles, RolesGuard, User } from '@jbhive/auth_be'
import { Role, UpdateUserInput, AdminUpdateUserInput } from "@jbhive/types_be";
import { LogService } from 'libs/utils/log/backend/src';
import { Source } from 'libs/source/backend/src';
import { AdminService } from './admin.service';

@UseGuards(RolesGuard)
@Resolver()
export class AdminResolver {
    constructor(private readonly service: AdminService, private readonly log: LogService) {}


    @Roles(Role.Astek, Role.Admin, Role.Lord)
    @Mutation( () => User, {nullable: true})
    async updateRoleUser(
        @CtxUser() user: User,
        @Args('userId') userId: number,
        @Args('roleId') roleId: number)  {
        this.log.logMethod(`Resolver.updateRoleUser(${userId}, ${roleId})`)
        return this.service.updateRoleUser(user.id, userId, roleId)
    }

    @Roles(Role.Astek, Role.Admin, Role.Lord)
    @Mutation( () => [User], {nullable: true})
    async loadAllDesactivatedUsers(
        @CtxUser() user: User)  {
        this.log.logMethod(`Resolver.loadAllDesactivatedUsers(${user.id})`)
        return this.service.loadAllDesactivatedUsers(user.id)
    }

    @Roles(Role.Astek, Role.Admin, Role.Lord)
    @Mutation( () => [User], {nullable: true})
    async loadAllActivatedUsers(
        @CtxUser() user: User)  {
        this.log.logMethod(`Resolver.loadAllActivatedUsers(${user.id})`)
        return this.service.loadAllActivatedUsers(user.id)
    }

    

    @Roles(Role.Astek, Role.Admin, Role.Lord)
    @Mutation( () => User, {nullable: true})
    async updateUser(
        @CtxUser() user: User,
        @Args('userId') userId: number,
        @Args('input') input: UpdateUserInput)  {
        this.log.logMethod(`Resolver.updateRoleUser(${userId}`)
        return this.service.updateUser(user.id, userId, input)
    }

    @Roles(Role.Astek, Role.Admin, Role.Lord)
    @Mutation( () => User, {nullable: true})
    async updateAdminUser(
        @CtxUser() user: User,
        @Args('userId') userId: number,
        @Args('input') input: AdminUpdateUserInput)  {
        this.log.logMethod(`Resolver.updateRoleUser(${userId}`)
        return this.service.updateAdminUser(user.id, userId, input)
    }

    @Mutation( () => User, {nullable: true})
    async updateMyself(
        @CtxUser() user: User,
        @Args('input') input: UpdateUserInput)  {
        this.log.logMethod(`Resolver.updateRoleUser(${user.id}`)
        return this.service.updateMyself(user.id, input)
    }

    @Roles(Role.Astek, Role.Admin)
    @Mutation( () => Boolean, {nullable: true})
    async deleteUser(
        @CtxUser() user: User,
        @Args('userId') userId: number)  {
        this.log.logMethod(`Resolver.deleteUser(${userId}`)
        return this.service.deleteUser(user.id, userId)
    }
}