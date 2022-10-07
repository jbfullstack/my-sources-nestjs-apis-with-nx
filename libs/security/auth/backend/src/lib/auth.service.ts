import { UserService } from "@jbhive/user_be";
import { Color, LogService } from "libs/utils/log/backend/src";
import { MethodNotAllowedException, BadRequestException, HttpException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CryptHelper } from "@jbhive/crypt";
import { AuthLoginInput } from "./dto/auth-login.input";
import { AuthRegisterInput } from "./dto/auth-register.input";
import { JwtDto } from "./dto/jwt.dto";
// import { Role } from "./enums/role.enum";
import { Role } from "@jbhive/types_be";
// import { UserToken } from "./models/user-token";
import { User } from "./models/user";
import { throwError } from "rxjs";

@Injectable()
export class AuthService {
    
    
    constructor(
        private readonly data: UserService,
        private readonly jwt: JwtService,
        private readonly log: LogService,
        private readonly config: ConfigService
        ) {}


    async login(input: AuthLoginInput) : Promise<User> {
        Logger.log(`login:`, input)
        const found = await this.data.findUserByNickname(input.nickname.toLowerCase())
        if (!found){
            this.log.err(`User with nickname ${input.nickname} does not exists`)
            const httpErrorResponse =  { errors:  {  credentials: [`User with nickname ${input.nickname} does not exists in the database`], }}
            throw new BadRequestException(JSON.stringify(httpErrorResponse))
        } else {
            Logger.debug(`user by nickname found:`, found)
        }

        if (!found.activated){
            this.log.err(`User with nickname ${input.nickname} not activated`)
            const httpErrorResponse =  { errors:  {  credentials: [`User with nickname ${input.nickname} is not activated`], }}
            throw new BadRequestException(JSON.stringify(httpErrorResponse))
        }

        const passwordValid = await CryptHelper.validate(input.password, found.password)
        if (!passwordValid) {
            this.log.err(`Invalid password`)
            const httpErrorResponse =  { errors:  {  credentials: [`Invalid password`], }}
            throw new BadRequestException(JSON.stringify(httpErrorResponse))
        } else {
            Logger.debug(`passwordValid:`, passwordValid)
        }

        const response = {
            ...found,
            token: this.signToken(found.id)
        }
        Logger.debug(`response: ${JSON.stringify(response)}`)      
        return response
    }


    async register(input: AuthRegisterInput) {         
        this.checkRegisterFieldsOk(input)        
        await this.manageNoDuplicatedEntryErros(input)

        const password = await CryptHelper.hash(input.password)    
        const created = await this.data.createUser({email: input.email, nickname: input.nickname, password: password, pseudo: input.pseudo, roleId: 0}) 

        const response = {
            ...created,
            role: {
                id: 0,
                name: 'user'
            }
        }      
        Logger.log(`response:`, response) 
        return response
    }
    

    checkRegisterFieldsOk(input: AuthRegisterInput) {
        let httpErrorResponse =  {
            errors: 
            {
                email: [],
                nickname: [],
                pseudo: [],
                password: [],
            }
        }

        let isEmailValids: boolean = true
        let isNicknameValids: boolean = true
        let isPseudoValids: boolean = true
        let isPasswordValids: boolean = true        

        if (input.email.trim().length ===0 || input.email.length < 10) {
            this.manageErrorMessage(
                httpErrorResponse.errors.email, 
                'email too short (min size 10)', 
                `Cannot register, the email must be 10 characters long at least` 
            )
            if (isEmailValids){ isEmailValids = false }
        }

        if (input.nickname.includes(' ')) {
            this.manageErrorMessage(
                httpErrorResponse.errors.nickname, 
                'nickname contains space', 
                `Cannot register, the nickname must have no space character` 
            )
            if (isNicknameValids){ isNicknameValids = false }
        }

        if (input.nickname.trim().length ===0 || input.nickname.length < 3) {
            this.manageErrorMessage(
                httpErrorResponse.errors.nickname, 
                'nickname empty or too short (min size 3)', 
                `Cannot register, the nickname must be 3 characters long at least` 
            )
            if (isNicknameValids){ isNicknameValids = false }
        }

        if (input.pseudo.includes(' ')) {
            this.manageErrorMessage(
                httpErrorResponse.errors.pseudo, 
                'pseudo contains space', 
                `Cannot register, the pseudo must have no space character` 
            )
            if (isPseudoValids){ isPseudoValids = false }
        }

        if (input.pseudo.trim().length ===0 || input.pseudo.length < 3) {
            this.manageErrorMessage(
                httpErrorResponse.errors.pseudo, 
                'pseudo empty or too short (min size 3)', 
                `Cannot register, the pseudo must be 3 characters long at least` 
            )
            if (isPseudoValids){ isPseudoValids = false }
        }

        if (input.password.trim().length ===0 || input.password.length < 4) {
            this.manageErrorMessage(
                httpErrorResponse.errors.password, 
                'password empty or too short (min size 4)', 
                `Cannot register, the password must be 4 characters long at least`
            )
            if (isPasswordValids){ isPasswordValids = false }
        }

        if ( !isEmailValids || ! isPasswordValids || ! isPasswordValids || !isNicknameValids){
            if (isEmailValids) { delete httpErrorResponse.errors.email }
            if (isPseudoValids) { delete httpErrorResponse.errors.pseudo }
            if (isPasswordValids) { delete httpErrorResponse.errors.password }
            if (isNicknameValids) { delete httpErrorResponse.errors.nickname }

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
                nickname: [],
            }
        }

        let isEmailValids: boolean = true
        let isPseudoValids: boolean = true  
        let isNicknameValids: boolean = true    

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

        const foundByNickname = await this.data.findUserByNickname(input.nickname.toLowerCase())
        if (foundByNickname){
            this.manageErrorMessage(httpErrorResponse.errors.nickname,
                'nickname already exists', `Cannot register with nickname ${input.nickname},pseudo already in db`)
                if (isNicknameValids){ isNicknameValids = false }
        }

        if (!isEmailValids || !isPseudoValids || !isNicknameValids) {
            if (isEmailValids) { delete httpErrorResponse.errors.email }
            if (isPseudoValids) { delete httpErrorResponse.errors.pseudo }
            if (isNicknameValids) { delete httpErrorResponse.errors.nickname }

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