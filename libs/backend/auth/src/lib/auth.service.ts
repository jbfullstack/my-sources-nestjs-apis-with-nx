import { DataService } from "@jbhive_be/data";
import { Color, LogService } from "@jbhive_be/log";
import { MethodNotAllowedException, BadRequestException, HttpException, Injectable, Logger, NotFoundException } from "@nestjs/common";
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
import { throwError } from "rxjs";

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
        // if (created) {
        //     throw new MethodNotAllowedException(JSON.stringify({ errors: {registration: ['signup completed, now an admin need to activate your account :)']}}))
        // }


        const response = {
            ...created,
            token: this.signToken(created.id),
            role: {
                id: 0,
                name: 'user'
            }
        }      
        return response
    }
    

    checkRegisterFieldsOk(input: AuthRegisterInput) {
        let httpErrorResponse =  {
            errors: 
            {
                email: [],
                pseudo: [],
                password: [],
            }
        }

        let isEmailValids: boolean = true
        let isPseudoValids: boolean = true
        let isPasswordValids: boolean = true        

        if (input.email.includes(' ')) {
            this.manageErrorMessage(
                httpErrorResponse.errors.email, 
                'email contains space', 
                `Cannot register, the email must have no space character` 
            )
            if (isEmailValids){ isEmailValids = false }  
        }

        if (input.email.length < 10) {
            this.manageErrorMessage(
                httpErrorResponse.errors.email, 
                'email too short (min size 10)', 
                `Cannot register, the email must be 10 characters long at least` 
            )
            if (isEmailValids){ isEmailValids = false }
        }

        console.log(`isEmailValids:`, isEmailValids)

        if (input.pseudo.includes(' ')) {
            this.manageErrorMessage(
                httpErrorResponse.errors.pseudo, 
                'pseudo contains space', 
                `Cannot register, the pseudo must have no space character` 
            )
            if (isPseudoValids){ isPseudoValids = false }
        }

        if (input.pseudo.length < 3) {
            this.manageErrorMessage(
                httpErrorResponse.errors.pseudo, 
                'pseudo too short (min size 3)', 
                `Cannot register, the pseudo must be 3 characters long at least` 
            )
            if (isPseudoValids){ isPseudoValids = false }
        }

        if (input.password.length < 4) {
            this.manageErrorMessage(
                httpErrorResponse.errors.password, 
                'password too short (min size 4)', 
                `Cannot register, the password must be 4 characters long at least`
            )
            if (isPasswordValids){ isPasswordValids = false }
        }

        if ( !isEmailValids || ! isPasswordValids || ! isPasswordValids){
            if (isEmailValids) { delete httpErrorResponse.errors.email }
            if (isPseudoValids) { delete httpErrorResponse.errors.pseudo }
            if (isPasswordValids) { delete httpErrorResponse.errors.password }

            throw new BadRequestException(JSON.stringify(httpErrorResponse))
        }
    }

    private manageErrorMessage(listToPush: string[], message: string, logErrMessage: string){
        listToPush.push(message)
        this.log.err(logErrMessage)
    }

    async manageNoDuplicatedEntryErros(input: AuthRegisterInput) {
        
        let httpErrorResponse =  {
            errors: 
            {
                email: [],
                pseudo: [],
            }
        }

        let isEmailValids: boolean = true
        let isPseudoValids: boolean = true    

        const foundByEmail = await this.data.findUserByEmail(input.email.toLowerCase())
        if (foundByEmail){
            this.manageErrorMessage(httpErrorResponse.errors.email,
                'email already exists', `Cannot register with email ${input.email}`)
            this.log.err(`Cannot register with email ${input.email},email already in db`)
            if (isEmailValids){ isEmailValids = false }
            
        }

        const foundByPseudo = await this.data.findUserByPseudo(input.pseudo.toLowerCase())
        if (foundByPseudo){
            this.manageErrorMessage(httpErrorResponse.errors.pseudo,
                'pseudo already exists', `Cannot register with pseudo ${input.email},pseudo already in db`)
                if (isPseudoValids){ isPseudoValids = false }
        }

        if (!isEmailValids || !isPseudoValids) {
            if (isEmailValids) { delete httpErrorResponse.errors.email }
            if (isPseudoValids) { delete httpErrorResponse.errors.pseudo }

            throw new BadRequestException(JSON.stringify(httpErrorResponse))
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