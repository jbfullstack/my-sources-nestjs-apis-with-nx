import { gql } from 'apollo-angular';

export function loadPublicAndOwnedSourcesGqlRequest() {
    return gql`query sources{   
        sources 
        {
            id
            title
            description
            type {title}
            public
            owner {	
                pseudo
                role { 
                    id
                    name
                }
            }
            tags {
                id
                title
                createdAt
            }
        }
    }`
}






