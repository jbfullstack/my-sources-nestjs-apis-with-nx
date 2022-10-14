import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';
import { loadPublicAndOwnedSourcesGqlRequest, loadTagsGqlRequest } from "../graphql-requests/source.request";

@Injectable()
export class SourceService {
   
    
    loadPublicAndOwnedSources() {
        return this.apollo.query<any>({ query: loadPublicAndOwnedSourcesGqlRequest() })
        .pipe(map((response: any) => response.data.sourcesPublicOrOwned))
    }

    loadTags() {
        return this.apollo.query<any>({ query: loadTagsGqlRequest() })
        .pipe(map((response: any) => response.data.tags))
    }


    constructor(private apollo: Apollo) { }
}