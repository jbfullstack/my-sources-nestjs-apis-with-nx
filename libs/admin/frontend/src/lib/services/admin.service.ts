import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';
import { AuthRegisterResponseInterface } from "../types/admin-response.interface";
import { loadAllDesactivatedUsersWithLessPrivilegesGqlRequest, activateUserWithLessPrivilegesGqlRequest, deleteUserWithLessPrivilegesGqlRequest, loadAllActivatedUsersWithLessPrivilegesGqlRequest, updateUserRoleGqlRequest, updatePasswordGqlRequest, hideUserIfDesactivatedAndLessPrivilegesGqlRequest } from "../graphql-requests/waiting-list.request";

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

    hideUser(id: number) {
        console.log('hideUser: ', id)
        return this.apollo.mutate<any>({ mutation: hideUserIfDesactivatedAndLessPrivilegesGqlRequest(id) })
        .pipe(map((response: any) => response.data))
    }

    desactivate(id: number) {
        console.log('desactivate: ', id)
        return this.apollo.mutate<any>({ mutation: activateUserWithLessPrivilegesGqlRequest(id, false) })
        .pipe(map((response: any) => response.data))
    }

    updateRole(userId: number, newRoleId: number) {
        console.log('updateRole: ', userId)
        return this.apollo.mutate<any>({ mutation: updateUserRoleGqlRequest(userId, newRoleId)})
        .pipe(map((response: any) => response.data))
    }

    
    deleteUser(id: number) {
        console.log('delete: ', id)
        return this.apollo.mutate<any>({ mutation: deleteUserWithLessPrivilegesGqlRequest(id) })
        .pipe(map((response: any) => response.data))
    }  
    
    generatePassword(userId: number, password: string) {
        console.log(`generatePassword(${userId}, ${password})`)
        return this.apollo.mutate<any>({ mutation: updatePasswordGqlRequest(userId, password) })
        .pipe(map((response: any) => response.data))
    }

    constructor(private apollo: Apollo) { }
}
