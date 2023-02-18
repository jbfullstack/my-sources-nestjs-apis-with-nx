import { Logger } from "@nestjs/common";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';
import { createSourceGqlRequest, createSourceWithTagGqlRequest, deleteSourceGqlRequest, deleteSourceOwnedGqlRequest, loadPublicAndOwnedSourcesGqlRequest, loadSourceTypesGqlRequest, loadTagsGqlRequest, updateSourceGqlRequest, updateSourceOwnedGqlRequest } from "../graphql-requests/source.request";
import { CreateSourceRequestInterface, UpdateSourceRequestInterface } from "@jbhive/types_fe";

import { sources_dataset, PrismaIncludes } from "@jbhive/types_be";

@Injectable()
export class SourceService {
    
    loadPublicAndOwnedSources() {
        return this.apollo.query<any>({ query: loadPublicAndOwnedSourcesGqlRequest() })
        .pipe(map((response: any) => response.data.sourcesPublicOrOwned))
    }

    loadTypes() {
        return this.apollo.query<any>({ query: loadSourceTypesGqlRequest() })
        .pipe(map((response: any) => response.data.types))
    }

    loadTags() {
        return this.apollo.query<any>({ query: loadTagsGqlRequest() })
        .pipe(map((response: any) => response.data.tags))
    }

    createSource(request: CreateSourceRequestInterface) {
        console.log('createSource: ', request)
        if (request?.tagsIds && request.tagsIds.length > 0){            
            return this.apollo.mutate<any>({ mutation: createSourceWithTagGqlRequest(request) })
            .pipe(map((response: any) => response.data.createSource))
        } else {
            return this.apollo.mutate<any>({ mutation: createSourceGqlRequest(request) })
            .pipe(map((response: any) => response.data.createSource))
        }
    }

    updateSourceOwned(id: number, input: UpdateSourceRequestInterface) {
        console.log('updateSourceOwned: ', id, input)
        return this.apollo.mutate<any>({ mutation: updateSourceOwnedGqlRequest(id, input) })
            .pipe(map((response: any) => response.data.updateSourceOwned))
    }

    updateSource(id: number, input: UpdateSourceRequestInterface) {
        console.log('updateSource: ', id, input)
        return this.apollo.mutate<any>({ mutation: updateSourceGqlRequest(id, input) })
            .pipe(map((response: any) => response.data.updateSource))
    }

    deleteSource(id: number) {
        console.log('deleteSource: ', id)
        return this.apollo.mutate<any>({ mutation: deleteSourceGqlRequest(id) })
            .pipe(map((response: any) => response.data.deleteSource))
    }

    deleteSourceOwned(id: number) {
        console.log('deleteSourceOwned: ', id)
        return this.apollo.mutate<any>({ mutation: deleteSourceOwnedGqlRequest(id) })
            .pipe(map((response: any) => response.data.deleteSourceOwned))
    }
    
    // async loadDataset() {
      
    //     Logger.debug(`Loading sources dataset..`)        
    //     for (var source of sources_dataset) {
    //         let dto: CreateSourceRequestInterface = 
    //             { title: source.title, public: true, url: source.url, description: source.description, content: source.content, typeId: source.typeId, tagsIds: []}
    //         await this.createSource(dto)
    //     }
    // }

    constructor(private apollo: Apollo) { }
}


