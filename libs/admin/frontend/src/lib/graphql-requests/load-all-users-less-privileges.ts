import { gql } from 'apollo-angular';

export function loadAllUsersWithLessPrivilegesGqlRequest() {
    return gql`mutation loadAllDesactivatedUsers{  
        loadAllDesactivatedUsers
        {
            id
            pseudo
            email
            createdAt
        } 
    }`
}


export function activateUserWithLessPrivilegesGqlRequest(userId: number) {
    return gql`mutation updateUser{ 
        updateUser( 
            userId: ${userId},
            input: {
            activated: true
        }
        ){
            activated          
        } 
    }`
}