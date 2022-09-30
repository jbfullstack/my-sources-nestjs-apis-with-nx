import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RegisterRequestInterface } from "../types/register-request.interface";
import { CurrentUserInterface } from '@jbhive_fe/types'
import { Apollo, gql } from 'apollo-angular';
import { AuthRegisterResponseInterface } from "../types/auth-response.interface";

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
        console.log(`<wx:!<wx!:<wx:! >>>> data: ${JSON.stringify(data)}`)
        const graphQlRequest = gql`mutation register{  
            register (
                input : {
                    email: "${data.email}",
                    password: "${data.password}",
                    pseudo: "${data.pseudo}",
                }) 
            {
                token
                id
                email
                pseudo
                nickname
            } 
        }`

        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: graphQlRequest })
        .pipe(map((response: any) => response.data.register))
    }
}