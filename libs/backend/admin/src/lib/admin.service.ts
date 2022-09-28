import { User } from "@jbhive_be/auth";
import { DataService } from "@jbhive_be/data";
import { LogService } from "@jbhive_be/log";
import { Role } from "@jbhive_be/struct";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ForbiddenError } from "apollo-server-express";
import { UpdateUserInput } from "./dto/update-user-inupt";

@Injectable()
export class AdminService {
    

    constructor(private readonly data: DataService, private readonly log: LogService) { }


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

        return this.data.updateUser(userId, input)
    }


    async updateMyself(id: number, input: UpdateUserInput) {
        const userFound = await this.data.findUser(id)
        if (!userFound) {
            throw new NotFoundException(`Can't update User ${id}, user not found`)
        }
        return this.data.updateUser(id, input)
    }

}