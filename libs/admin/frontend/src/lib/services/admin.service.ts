import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';
import { AuthRegisterResponseInterface } from "../types/admin-response.interface";
import { loadAllUsersWithLessPrivilegesGqlRequest, activateUserWithLessPrivilegesGqlRequest } from "../graphql-requests/load-all-users-less-privileges";

@Injectable()
export class AdminService {
    
    
    
    loadAllDesactivatedUsers() {
        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: loadAllUsersWithLessPrivilegesGqlRequest() })
        .pipe(map((response: any) => response.data.loadAllDesactivatedUsers))
    }

    activate(id: number) {
        return this.apollo.mutate<any>({ mutation: activateUserWithLessPrivilegesGqlRequest(id) })
        .pipe(map((response: any) => response.data))
    }
    
    

    constructor(private apollo: Apollo) { }
}