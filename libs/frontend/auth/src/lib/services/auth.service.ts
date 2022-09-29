import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterRequestInterface } from "../types/register-request.interface";
import { CurrentUserInterface } from '@jbhive_fe/types'
import { Apollo, gql } from 'apollo-angular';
import { AuthResponseInterface } from "../types/auth-response.interface";

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

    register(data: RegisterRequestInterface) { //}: Observable<CurrentUserInterface> {
        const graphQlRequest = gql`mutation register{  
            register (
                input : {
                    email: "${data.input.email}",
                    password: "${data.input.password}",
                    pseudo: "${data.input.pseudo}",
                }) 
            {
                token
                user {
                    id
                    email
                    pseudo
                    nickname
                }
            } 
        }`

        return this.apollo.mutate<AuthResponseInterface>({ mutation: graphQlRequest })
        
    }
}