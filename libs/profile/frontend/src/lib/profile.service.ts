import { Injectable } from "@nestjs/common";
import { Apollo } from "apollo-angular";
import { map } from "rxjs";
import { updateUserProfileRequestGqlRequest, updateUserProfileWithoutPasswordRequestGqlRequest } from "./graphql-requests/profile-gql.request";
import { UpdateUserProfileRequestInterface } from "./update-user-profile-request.interface";

@Injectable()
export class ProfileService  {

    updateUserProfile(request: UpdateUserProfileRequestInterface) {
        console.log('updateUserProfile: ', request)
        if (request?.password){
            return this.apollo.mutate<any>({ mutation: updateUserProfileRequestGqlRequest(request) })
            .pipe(map((response: any) => response.data.updateTag))
        }else {
            return this.apollo.mutate<any>({ mutation: updateUserProfileWithoutPasswordRequestGqlRequest(request) })
            .pipe(map((response: any) => response.data.updateTag))
        }
    }

    constructor(private apollo: Apollo) {   }
}