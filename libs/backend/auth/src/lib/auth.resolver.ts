import { Args,  Resolver, Mutation } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthLoginInput } from "./dto/auth-login.input";
import { AuthRegisterInput } from "./dto/auth-register.input";
import { User } from "./models/user";
// import { UserToken } from "./models/user-token";


@Resolver()
export class AuthResolver {

    constructor(private readonly service: AuthService){}

    @Mutation( () => User)
    login(@Args({ name: 'input', type: () => AuthLoginInput }) input: AuthLoginInput){
        return this.service.login(input)
    }

    @Mutation( () => User)
    register(@Args({ name: 'input', type: () => AuthRegisterInput }) input: AuthRegisterInput){
        return this.service.register(input)
    }

}