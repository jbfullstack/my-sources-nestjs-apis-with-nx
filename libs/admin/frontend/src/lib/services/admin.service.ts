import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';
import { AuthRegisterResponseInterface } from "../types/admin-response.interface";
import { loadAllDesactivatedUsersWithLessPrivilegesGqlRequest, activateUserWithLessPrivilegesGqlRequest, deleteUserWithLessPrivilegesGqlRequest, loadAllActivatedUsersWithLessPrivilegesGqlRequest } from "../graphql-requests/waiting-list.request";

@Injectable()
export class AdminService {
    
    
    
    loadAllDesactivatedUsers() {
        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: loadAllDesactivatedUsersWithLessPrivilegesGqlRequest() })
        .pipe(map((response: any) => response.data.loadAllDesactivatedUsers))
    }

    loadAllActivatedUsers(){
        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: loadAllActivatedUsersWithLessPrivilegesGqlRequest() })
        .pipe(map((response: any) => response.data.loadAllActivatedUsers))
    }

    activate(id: number) {
        console.log('activate: ', id)
        return this.apollo.mutate<any>({ mutation: activateUserWithLessPrivilegesGqlRequest(id, true) })
        .pipe(map((response: any) => response.data))
    }

    desactivate(id: number) {
        console.log('desactivate: ', id)
        return this.apollo.mutate<any>({ mutation: activateUserWithLessPrivilegesGqlRequest(id, false) })
        .pipe(map((response: any) => response.data))
    }

    
    deleteUser(id: number) {
        console.log('delete: ', id)
        return this.apollo.mutate<any>({ mutation: deleteUserWithLessPrivilegesGqlRequest(id) })
        .pipe(map((response: any) => response.data))
    }
    

    constructor(private apollo: Apollo) { }
}