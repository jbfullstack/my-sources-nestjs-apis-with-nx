import { DataService } from "@jbhive_be/data";
import { Color, LogService } from "@jbhive_be/log";
import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CryptHelper } from "@jbhive_be/crypt";
import { AuthLoginInput } from "./dto/auth-login.input";
import { AuthRegisterInput } from "./dto/auth-register.input";
import { JwtDto } from "./dto/jwt.dto";
// import { Role } from "./enums/role.enum";
import { Role } from "@jbhive_be/struct";
// import { UserToken } from "./models/user-token";
import { User } from "./models/user";

@Injectable()
export class AuthService {
    
    
    constructor(
        private readonly data: DataService,
        private readonly jwt: JwtService,
        private readonly log: LogService,
        private readonly config: ConfigService
        ) {}


    async login(input: AuthLoginInput) : Promise<User> {
        const found = await this.data.findUserByEmail(input.email.toLowerCase())
        if (!found){
            this.log.err(`User with email ${input.email} does not exists`)
            throw new NotFoundException(`User with email ${input.email} does not exists`)
        }

        const passwordValid = await CryptHelper.validate(input.password, found.password)
        if (!passwordValid) {
            this.log.err(`Invalid password`)
            throw new Error(`Invalid password`)
        }

        const response = {
            ...found,
            token: this.signToken(found.id)
        }
        // this.log.err(`response: ${JSON.stringify(response)}`)      
        return response
    }


    async register(input: AuthRegisterInput) {    
        
        this.checkRegisterFieldsOk(input)
        
        await this.manageNoDuplicatedEntryErros(input)


        const password = await CryptHelper.hash(input.password)    
        const created = await this.data.createUser({email: input.email, password: password, pseudo: input.pseudo, roleId: 0})
        // this.log.err(`created: ${JSON.stringify(created)}`)

        const response = {
            ...created,
            // token: this.signToken(created.id)
        }
        // this.log.err(`response: ${JSON.stringify(response)}`)      
        return response
    }
    

    checkRegisterFieldsOk(input: AuthRegisterInput) {
        if (input.email.length < 10) {
            this.log.err(`Cannot register, the email must be 10 characters long at least`)
            throw new BadRequestException(`The email must be 10 characters long at least`)
        }

        if (input.pseudo.includes(' ')) {
            this.log.err(`Cannot register, the pseudo must have no space character`)
            throw new BadRequestException(`The pseudo must have no space character`)
        }

        if (input.pseudo.length < 3) {
            this.log.err(`Cannot register, the pseudo must be 3 characters long at least`)
            this.log.err(`Cannot register, the pseudo must be 3 characters long at least`)
        }

        if (input.password.length < 4) {
            this.log.err(`Cannot register, the password must be 4 characters long at least`)
            this.log.err(`Cannot register, the password must be 4 characters long at least`)
        }
    }

    async manageNoDuplicatedEntryErros(input: AuthRegisterInput) {
        const foundByEmail = await this.data.findUserByEmail(input.email.toLowerCase())
        if (foundByEmail){
            this.log.err(`Cannot register with email ${input.email}`)
            throw new BadRequestException(`Cannot register with email ${input.email}`)
        }

        const foundByPseudo = await this.data.findUserByPseudo(input.pseudo.toLowerCase())
        if (foundByPseudo){
            this.log.err(`Cannot register with pseudo ${input.pseudo}`)
            throw new BadRequestException(`Cannot register with pseudo ${input.pseudo}`)
        }
    }

    signToken(id: number): string {
        const payload: JwtDto = { userId: id, roleId: Role.User}
        return this.jwt.sign(payload)
    }

    validateUser(userId: number) {
        return this.data.findUserById(userId)
    }
}