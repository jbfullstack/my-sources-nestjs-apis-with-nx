import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs";
import { updateUserProfileRequestGqlRequest, updateUserProfileWithoutPasswordRequestGqlRequest } from "./graphql-requests/profile-gql.request";
import { UpdateUserProfileRequestInterface } from "./update-user-profile-request.interface";

@Injectable()
export class ProfileService  {

    updateUserProfile(request: UpdateUserProfileRequestInterface) {
        console.log('updateUserProfile: ', request)
        if (request.password !== ''){
            return this.apollo.mutate<any>({ mutation: updateUserProfileRequestGqlRequest(request) })
            .pipe(map((response: any) => response.data.updateMyself))
        }else {
            return this.apollo.mutate<any>({ mutation: updateUserProfileWithoutPasswordRequestGqlRequest(request) })
            .pipe(map((response: any) => response.data.updateMyself))
        }
    }

    constructor(private apollo: Apollo) { }
}