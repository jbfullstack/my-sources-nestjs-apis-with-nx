import { CreateSourceRequestInterface, UpdateSourceRequestInterface } from '@jbhive/types_fe';
import { gql } from 'apollo-angular';

export function loadPublicAndOwnedSourcesGqlRequest() {
    return gql`query sourcesPublicOrOwned{   
        sourcesPublicOrOwned 
        {
            id
            title
            url
            content
            description
            type {
                id
                title
            }
            public
            createdAt
            owner {	
                id
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

export function loadTagsGqlRequest() {
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

export function loadSourceTypesGqlRequest(){
    return gql`query types{   
        types 
        {
            id
            title
            description
        }
    }`
}

export function createSourceGqlRequest(request: CreateSourceRequestInterface){
    return gql`mutation createSource{  
        createSource (
            typeId: ${request.typeId},
            tagIds: [],
            input : {
                title: "${request.title}",
                description: "${request.description}",
                content: "${request.content}",
                public: ${request.public},
                url: "${request.url}"
            }
        ) 
        {
            id
            title
            content
            url
            description
            type {
                id
                title
            }
            public
            createdAt
            owner {	
                id
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

export function createSourceWithTagGqlRequest(request: CreateSourceRequestInterface){
    return gql`mutation createSource{  
        createSource (
            typeId: ${request.typeId},
            tagIds: [${request.tagsIds}],
            input : {
                title: "${request.title}",
                description: "${request.description}",
                content: "${request.content}",
                public: ${request.public},
                url: "${request.url}"
            }
        ) 
        {
            id
            title
            url
            content
            description
            type {
                id
                title
            }
            public
            createdAt
            owner {	
                id
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

export function deleteSourceOwnedGqlRequest(id: number){
    return gql`mutation deleteSourceOwned {    
        deleteSourceOwned(id: ${id})
    }`
}

export function deleteSourceGqlRequest(id: number){
    return gql`mutation deleteSource {    
        deleteSource(id: ${id})
    }`
}





export function updateSourceOwnedGqlRequest(id: number, request: UpdateSourceRequestInterface){
    return gql`mutation updateSourceOwned{  
        updateSourceOwned (
            id: ${id},
            input : {
                title: "${request.title}",
                description: "${request.description}",
                content: "${request.content}",
                public: ${request.public},
                url: "${request.url}",
                typeId: ${request.typeId},
                tagIds: [${request.tagsIds}],
            }
        ) 
        {
            id
            title
            url
            content
            description
            type {
                id
                title
            }
            public
            createdAt
            owner {	
                id
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
    
    export function updateSourceGqlRequest(id: number, request: UpdateSourceRequestInterface){
        return gql`mutation updateSource{  
            updateSource (
                id: ${id},
                input : {
                    title: "${request.title}",
                    description: "${request.description}",
                    content: "${request.content}",
                    public: ${request.public},
                    url: "${request.url}",
                    typeId: ${request.typeId},
                    tagIds: [${request.tagsIds}],
                }
            ) 
            {
                id
                title
                url
                content
                description
                type {
                    id
                    title
                }
                public
                createdAt
                owner {	
                    id
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






