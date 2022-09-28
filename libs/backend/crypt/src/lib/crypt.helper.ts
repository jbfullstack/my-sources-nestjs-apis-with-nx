import { Logger } from '@nestjs/common';
import { compare, hash } from 'bcryptjs'

export class CryptHelper {


    static validate(password: string, hashedPassword: string): Promise<boolean> {        
        return compare(password, hashedPassword)
    }


    static hash(password): Promise<string> {
        return hash(password, 10)
    }
}