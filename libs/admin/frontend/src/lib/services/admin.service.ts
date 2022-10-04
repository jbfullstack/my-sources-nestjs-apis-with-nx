import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';
import { AuthRegisterResponseInterface } from "../types/admin-response.interface";
import { loadAllUsersWithLessPrivilegesGqlRequest } from "../graphql-requests/load-all-users-less-privileges";

@Injectable()
export class AdminService {
    
    
    loadAllDesactivatedUsers() {
        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: loadAllUsersWithLessPrivilegesGqlRequest() })
        .pipe(map((response: any) => response.data.loadAllDesactivatedUsers))
    }
    
    

    constructor(private apollo: Apollo) { }
}