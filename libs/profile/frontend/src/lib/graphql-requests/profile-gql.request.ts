import { gql } from 'apollo-angular';
import { UpdateUserProfileRequestInterface } from '../update-user-profile-request.interface';

export function updateUserProfileRequestGqlRequest(data: UpdateUserProfileRequestInterface) {
    return gql`mutation updateMyself{ 
        updateMyself( 
            input: {
                pseudo:"${data.pseudo}",
                email:"${data.email}",
                nickname:"${data.nickname}",
                password:"${data.password}"
            }
        ){
            id
            pseudo
            email          
        } 
    }`
}

export function updateUserProfileWithoutPasswordRequestGqlRequest(data: UpdateUserProfileRequestInterface) {
    return gql`mutation updateMyself{ 
        updateMyself( 
            input: {
                pseudo:"${data.pseudo}",
                email:"${data.email}",
                nickname:"${data.nickname}"
            }
        ){
            id
            pseudo
            email          
        } 
    }`
}