import { gql } from 'apollo-angular';
import { AdminUnactivatedUSersRequestInterface } from '../types/admin-activated-users.request.interface.ts';

export function activateUserGqlRequest( userId: number) {
    return gql`mutation updateUser{ 
        updateUser( 
            userId: '${userId}',
            input: {
                activated:true
            }
        ){
            id
        } 
    }`
}