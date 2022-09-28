import { LogService } from "@jbhive_be/log";
import { Type, CanActivate, ExecutionContext, mixin, Injectable, Inject, UnauthorizedException, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { GqlAuthGuard } from "./gql-auth.guards";

@Injectable()
export class RolesGuard extends GqlAuthGuard{
    constructor(reflector: Reflector, log: LogService) {
        super(reflector, log);
    }

    async canActivate(context: ExecutionContext) {
        // this.log.logGuardMethod(context.getClass().name, context.getHandler().name)
        await super.canActivate(context)
        this.log.logGuard(`RolesGuard`, `yopla`)

        const roles = super.getRoles(context);
        if (!roles) {
            this.log.logGuard(`RolesGuard`, `no role restriction for this endpoint, request allowed`)
            return true
        } 

        const user = GqlExecutionContext.create(context).getContext().req.user
        if (!roles.includes(user.roleId)){
            this.log.logGuard(`RolesGuard`, `user #${user.id} ${user.email} with role ${user.roleId} is not allowed`)
            return false
        }        

        this.log.logGuard(`RolesGuard`, `user #${user.id} ${user.email} with role ${user.roleId} allowed to perform the request`)
        return true
    }
}