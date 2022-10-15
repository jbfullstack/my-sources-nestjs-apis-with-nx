import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';
import { createSourceGqlRequest, createSourceWithTagGqlRequest, loadPublicAndOwnedSourcesGqlRequest, loadSourceTypesGqlRequest, loadTagsGqlRequest } from "../graphql-requests/source.request";
import { CreateSourceRequestInterface } from "@jbhive/types_fe";

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


    constructor(private apollo: Apollo) { }
}


