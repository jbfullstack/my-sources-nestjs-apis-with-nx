import { gql } from 'apollo-angular';
import { LoginRequestInterface } from '../types/login-request.interface';

export function createLoginGqlRequest( data: LoginRequestInterface) {
    return gql`mutation login{  
        login (
            input : {
                nickname: "${data.nickname}",
                password: "${data.password}",
            }) 
        {
            id
            email
            pseudo
            nickname
            role { 
                name
                id
            }
            token
        } 
    }`
}