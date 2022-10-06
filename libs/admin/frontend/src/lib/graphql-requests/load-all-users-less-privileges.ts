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