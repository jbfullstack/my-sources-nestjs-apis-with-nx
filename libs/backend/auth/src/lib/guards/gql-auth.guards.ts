import { Color, LogService } from "@jbhive/log";
import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "@jbhive/struct";


@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt'){

    constructor(private reflector: Reflector, readonly log: LogService) {
        super();
    }

    /**
     * Transform the 'GraphQl context' into a 'standard HTTP request'
     */
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)

        return ctx.getContext().req
    }

    canActivate(context: ExecutionContext) {
        this.log.logGuardMethod(context.getClass().name, context.getHandler().name)
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            this.log.logGuard(`GqlAuthGuard`, `GqlAuthGuard: public route, request allowed`)
            return true;
        } else {
            this.log.logGuard(`GqlAuthGuard`, `GqlAuthGuard: user logged`)
        }

        this.log.logGuard(`XXXXX`, `super.canActivate from GplAuthGuard`)
        return super.canActivate(context);
    }

    

    getRoles(context: ExecutionContext) {
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        return roles;
    }

}