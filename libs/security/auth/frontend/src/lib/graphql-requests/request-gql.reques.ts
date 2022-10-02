import { gql } from 'apollo-angular';
import { RegisterRequestInterface } from '../types/register-request.interface';

export function createRequestGqlRequest(data: RegisterRequestInterface) {
    return gql`mutation register{  
        register (
            input : {
                email: "${data.email}",
                password: "${data.password}",
                pseudo: "${data.pseudo}",
                nickname: "${data.nickname}",
            }) 
        {
            token
            id
            email
            pseudo
            nickname
            role {
                id
                name
            }
        } 
    }`
}