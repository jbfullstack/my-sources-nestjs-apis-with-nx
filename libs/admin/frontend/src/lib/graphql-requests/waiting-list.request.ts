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
    return gql`mutation updateAdminUser{ 
        updateAdminUser( 
            userId: ${userId},
            input: {
                activated: true
            }
        ){
            id
            pseudo
            email         
        } 
    }`
}

export function  deleteUserWithLessPrivilegesGqlRequest(userId: number) {
    return gql`mutation deleteUser{ 
        deleteUser(userId: ${userId})
    }`
}