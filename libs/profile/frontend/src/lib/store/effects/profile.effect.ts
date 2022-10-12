import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';


import { UserInterface} from '@jbhive/types_fe';
import { SnackBarComponent } from '@jbhive/snackbar';
import { updateUserProfileAction, updateUserProfileFailureAction, updateUserProfileSuccessAction } from '../actions/profile.action';
import { ProfileService } from '../../profile.service';


@Injectable()
export class ProfileEffect {
    

    updateUserProfile$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateUserProfileAction),
            switchMap( (action) => {
                console.log('updateUserProfile>: ', action)
                return this.profileService.updateUserProfile(action)
                .pipe(
                    map((user: UserInterface) => {
                        this.snackbar.openDefaultSnackBar(`Success: profile update \n You will need to re-loggin to regenerate access token :)`)
                        return updateUserProfileSuccessAction({user})
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`${errorResponse.message}`)
                        return of(updateUserProfileFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    // updateCurrentUser$ = createEffect( () => 
    // this.actions$.pipe(
    //     ofType(updateUserProfileSuccessAction),
    //     switchMap( (action) => {
    //         console.log('updateCurrentUser$ : ', action)
    //         return updateCurentUserAction({action.})
    //     })
    // )
    //)


    constructor(
        private actions$: Actions, 
        private profileService: ProfileService, 
        private snackbar: SnackBarComponent
    ) {}
}
