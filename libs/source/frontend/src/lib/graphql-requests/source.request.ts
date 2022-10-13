import { gql } from 'apollo-angular';

export function loadPublicAndOwnedSourcesGqlRequest() {
    return gql`query sourcesPublicOrOwned{   
        sourcesPublicOrOwned 
        {
            id
            title
            url
            description
            type {title}
            public
            createdAt
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






