import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { JwtDto } from "../dto/jwt.dto";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly service: AuthService, private readonly config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt_secret'),
            ignoreExpiration: false,
        })
    }

    async validate(payload: JwtDto) {

        const user = await this.service.validateUser(payload.userId)

        if (!user){
            throw new UnauthorizedException()
        }

        // return payload
        return user
    }


    // async validate(payload: any) {
    //     // TODO : can add DB connection in order to retrieve more data for the JWToken
    //     // --- Can also be used to perform token revocation
    //     if(process.env.DISPLAY_RESPONSES === 'true') {
    //         LogC.logMethod(`JwtStrategy.validate(${JSON.stringify(payload)})`, Color.FgYellow );
    //     } else {
    //         LogC.logMethod(`JwtStrategy.validate(${payload.pseudo})`, Color.FgYellow );
    //     }
        
    //     return { userId: payload.sub, username: payload.username, role: payload.role };
    // }
}