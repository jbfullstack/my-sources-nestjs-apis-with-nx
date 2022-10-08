import { gql } from 'apollo-angular';

export function loadAllDesactivatedUsersWithLessPrivilegesGqlRequest() {
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

export function loadAllActivatedUsersWithLessPrivilegesGqlRequest() {
    return gql`mutation loadAllActivatedUsers{  
        loadAllActivatedUsers
        {
            id
            pseudo
            email
            createdAt
        } 
    }`
}


export function activateUserWithLessPrivilegesGqlRequest(userId: number, activate: boolean) {
    return gql`mutation updateAdminUser{ 
        updateAdminUser( 
            userId: ${userId},
            input: {
                activated: ${activate}
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