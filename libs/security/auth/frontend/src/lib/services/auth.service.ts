import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RegisterRequestInterface } from "../types/register-request.interface";
import { UserInterface } from '@jbhive/types_fe'
import { Apollo, gql } from 'apollo-angular';
import { AuthRegisterResponseInterface } from "../types/auth-response.interface";
import { LoginRequestInterface } from "../types/login-request.interface";
import { createLoginGqlRequest } from "../graphql-requests/login-gql.request";
import { createRequestGqlRequest } from "../graphql-requests/request-gql.reques";

@Injectable()
export class AuthService {
    
    

    constructor(private apollo: Apollo) { }

    // private querySubscription: Subscription = new Subscription;
    
    // getUptime() {
    //     const uptime = this.apollo.query<any>({
    //         query: gql`query {uptime}`,
    //     })
    //     return uptime
    // }

    register(data: RegisterRequestInterface) : Observable<UserInterface> {
        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: createRequestGqlRequest(data) })
        .pipe(map((response: any) => response.data.register))
    }

    login(data: LoginRequestInterface) : Observable<UserInterface> {
        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: createLoginGqlRequest(data) })
        .pipe(map((response: any) => response.data.login ))
    }

    logout() {
        throw new Error('Method not implemented.');
    }
}