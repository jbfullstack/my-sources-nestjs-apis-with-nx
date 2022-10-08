import { UserService } from "@jbhive/user_be";
import { LogService } from "@jbhive/log_be";
import { Role, UpdateUserInput, AdminUpdateUserInput } from "@jbhive/types_be";
import { Injectable, Logger, MethodNotAllowedException, NotFoundException, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ForbiddenError } from "apollo-server-express";
import { Prisma, PrismaClient, Tag } from "@prisma/client";

@Injectable()
export class AdminService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
   
    

    constructor(private readonly data: UserService, private readonly log: LogService) {
        super()
     }

     async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }


    async updateRoleUser(loggedUserId: number, userId: number, roleId: number) {

        // Find user
        const userFound = await this.data.findUser(userId)
        if (!userFound) {
            throw new NotFoundException(`Can't update Role of user ${userId}, user not found`)
        }

        if (userFound.roleId === Role.Astek) {
            throw new ForbiddenError(`User ${userId} is granted Astek, no one can update its role`)
        }

        if (roleId === Role.Astek) {
            throw new ForbiddenError(`User ${userId} can't be granted Astek, only one allowed in the application`)
        }

        // find looged user
        const loggedUserFound = await this.data.findUser(loggedUserId)
        if (!loggedUserFound) {
            throw new NotFoundException(`User ${loggedUserId} not allowed to perform update role operation, user not found`)
        }

        if (loggedUserFound.roleId < userFound.roleId) {
            throw new NotFoundException(`User ${loggedUserId} not allowed to perform update role operation on user ${userId}, logged user has less privileges`)
        }

        if (loggedUserFound.roleId < roleId) {
            throw new NotFoundException(`User ${loggedUserId} not allowed to grant user ${userId} to a higher level of privileges than himself`)
        }

        return this.data.updateRoleUser(userId, roleId)
    }

    async updateUser(loggedUserId: number, userId: number, input: UpdateUserInput) {
        const userFound = await this.data.findUser(userId)
        if (!userFound) {
            throw new NotFoundException(`Can't update User ${userId}, user not found`)
        }

        const loggedUserFound = await this.data.findUser(loggedUserId)
        if (!loggedUserFound) {
            throw new NotFoundException(`User ${loggedUserId} not allowed to perform update role operation, user not found`)
        }

        if (loggedUserFound.roleId < userFound.roleId) {
            throw new NotFoundException(`User ${loggedUserId} not allowed to perform update operation on user ${userId}, logged user has less privileges`)
        }

        Logger.log('VOILLLAAAAA')

        return this.data.updateUser(userId, input)
    }

    async updateAdminUser(loggedUserId: number, userId: number, input: AdminUpdateUserInput) {
        const userFound = await this.data.findUser(userId)
        if (!userFound) {
            throw new NotFoundException(`Can't update User ${userId}, user not found`)
        }

        const loggedUserFound = await this.data.findUser(loggedUserId)
        if (!loggedUserFound) {
            throw new NotFoundException(`User ${loggedUserId} not allowed to perform update role operation, user not found`)
        }

        if (loggedUserFound.roleId < userFound.roleId) {
            throw new NotFoundException(`User ${loggedUserId} not allowed to perform update operation on user ${userId}, logged user has less privileges`)
        }

        Logger.log('VOILLLAAAAA')

        return this.data.updateAdminUser(userId, input)
    }

    async deleteUser(loggedUserId: any, userId: number) {
        const userFound = await this.data.findUser(loggedUserId)
        const loggedFound = await this.data.findUser(userId)

        if (!userFound ||! loggedFound) {
            throw new NotFoundException(`User ${loggedUserId} can't delete user ${userFound}, at least one does not exists`)
        }

        if (userFound.roleId <= loggedFound.roleId){
            throw new MethodNotAllowedException(`User ${loggedUserId} not allowed to delete user ${userFound}`)
        }

        return await this.data.deleteUser(userId)
    }


    async updateMyself(id: number, input: UpdateUserInput) {
        const userFound = await this.data.findUser(id)
        if (!userFound) {
            throw new NotFoundException(`Can't update User ${id}, user not found`)
        }
        return this.data.updateUser(id, input)
    }

    async loadAllDesactivatedUsers(id: number) {
        const loggedFound = await this.data.findUserById(id)
        if (!loggedFound) {
            throw new NotFoundException(`Can't load all deactivated users, User ${id} not found`)
        }

        const found = await this.user.findMany({
            where: {
                activated: false,
                hidden: false,
                roleId: {
                    lt: loggedFound.role.id
                }
            }
        })

        Logger.error('loadAllDesactivatedUsers - found: ', found)
        return found
    }

    async loadAllActivatedUsers(id: number) {
        const loggedFound = await this.data.findUserById(id)
        if (!loggedFound) {
            throw new NotFoundException(`Can't load all activated users, User ${id} not found`)
        }

        const found = await this.user.findMany({
            where: {
                activated: true,
                hidden: false,
                roleId: {
                    lt: loggedFound.role.id
                }
            }
        })

        Logger.error('loadAllActivatedUsers - found: ', found)
        return found
    }

}