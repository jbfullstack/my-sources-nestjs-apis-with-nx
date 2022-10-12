import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';
import { loadPublicAndOwnedSourcesGqlRequest } from "../graphql-requests/source.request";

@Injectable()
export class SourceService {
    
    loadPublicAndOwnedSources() {
        return this.apollo.mutate<any>({ mutation: loadPublicAndOwnedSourcesGqlRequest() })
        .pipe(map((response: any) => response.data.loadAllDesactivatedUsers))
    }


    constructor(private apollo: Apollo) { }
}