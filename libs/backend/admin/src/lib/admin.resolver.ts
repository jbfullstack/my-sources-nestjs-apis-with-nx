
import { Args, Query, Resolver, Mutation,  } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common'
import { CtxUser, GqlAuthGuard, Public, Roles, RolesGuard, User } from '@jbhive_be/auth'
import { Role } from "@jbhive_be/struct";
import { LogService } from '@jbhive_be/log';
import { Source } from '@jbhive_be/source';
import { AdminService } from './admin.service';
import { UpdateUserInput } from './dto/update-user-inupt';

@UseGuards(RolesGuard)
@Resolver()
export class AdminResolver {
    constructor(private readonly service: AdminService, private readonly log: LogService) {}


    @Roles(Role.Astek, Role.Admin, Role.Lord)
    @Mutation( () => Source, {nullable: true})
    async updateRoleUser(
        @CtxUser() user: User,
        @Args('userId') userId: number,
        @Args('roleId') roleId: number)  {
        this.log.logMethod(`Resolver.updateRoleUser(${userId}, ${roleId})`)
        return this.service.updateRoleUser(user.id, userId, roleId)
    }

    @Roles(Role.Astek, Role.Admin, Role.Lord)
    @Mutation( () => Source, {nullable: true})
    async updateUser(
        @CtxUser() user: User,
        @Args('userId') userId: number,
        @Args('input') input: UpdateUserInput)  {
        this.log.logMethod(`Resolver.updateRoleUser(${userId}`)
        return this.service.updateUser(user.id, userId, input)
    }

    @Mutation( () => Source, {nullable: true})
    async updateMyself(
        @CtxUser() user: User,
        @Args('input') input: UpdateUserInput)  {
        this.log.logMethod(`Resolver.updateRoleUser(${user.id}`)
        return this.service.updateMyself(user.id, input)
    }
}