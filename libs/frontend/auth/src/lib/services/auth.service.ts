import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RegisterRequestInterface } from "../types/register-request.interface";
import { CurrentUserInterface } from '@jbhive_fe/types'
import { Apollo, gql } from 'apollo-angular';
import { AuthRegisterResponseInterface } from "../types/auth-response.interface";
import { LoginRequestInterface } from "../types/login-request.interface";

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

    register(data: RegisterRequestInterface) : Observable<CurrentUserInterface> {
        console.log(`<wx:!<wx!:<wx:! >>>> data: ${JSON.stringify(data)}`)
        const graphQlRequest = gql`mutation register{  
            register (
                input : {
                    email: "${data.email}",
                    password: "${data.password}",
                    pseudo: "${data.pseudo}",
                    nickname: "${data.nickname}",
                }) 
            {
                token
                id
                email
                pseudo
                nickname
                role {
                    id
                    name
                }

            } 
        }`

        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: graphQlRequest })
        .pipe(map((response: any) => response.data.register))
    }

    login(data: LoginRequestInterface) : Observable<CurrentUserInterface> {
        console.log(`loooooooogin:<wx:! >>>> data: ${JSON.stringify(data)}`)
        const graphQlRequest = gql`mutation login{  
            login (
                input : {
                    nickname: "${data.nickname}",
                    password: "${data.password}",
                }) 
            {
                id
                email
                pseudo
                nickname
                role { 
                    name
                    id
                }
                token
            } 
        }`
        

        return this.apollo.mutate<AuthRegisterResponseInterface>({ mutation: graphQlRequest })
        .pipe(map((response: any) => response.data.login))
    }
}