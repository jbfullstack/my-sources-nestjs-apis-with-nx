import { gql } from 'apollo-angular';

export function loadAllDesactivatedUsersWithLessPrivilegesGqlRequest() {
    return gql`mutation loadAllDesactivatedUsers{  
        loadAllDesactivatedUsers
        {
            id
            pseudo
            email
            createdAt
            role {
                id
            }
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
            role {
                id
            }
        } 
    }`
}

export function loadAllTagsGqlRequest() {
    return gql`query tags{   
        tags 
        {
            id
            title
            description
            author {        
                id
                pseudo
            }      
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

/**
 * TODO: Manage backend side: 'only if user is desactivated'
 */
export function hideUserIfDesactivatedAndLessPrivilegesGqlRequest(userId: number) {
    return gql`mutation updateAdminUser{ 
        updateAdminUser( 
            userId: ${userId},
            input: {
                hidden: true
            }
        ){
            id
            pseudo
            email  
        } 
    }`
}

export function updateUserRoleGqlRequest(userId: number, newRoleId: number) {
    return gql`mutation updateRoleUser{ 
        updateRoleUser( 
            userId: ${userId},
            roleId: ${newRoleId}
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


export function updatePasswordGqlRequest(userId: number, password: string) {
    return gql`mutation updateUser{ 
        updateUser( 
            userId: ${userId},
            input: {
                password: "${password}"
            }
        ){
            id
            pseudo
            email
        } 
    }`
}

export function updateTagGqlRequest(id: number, title: string, description: string) {
    return gql`mutation updateTag{    
        updateTag (
            id: ${id}
            input : {
                title: "${title}",
                description: "${description}"
            }
        ) 
        {
            id
            title
            description
        }
    }`
}




