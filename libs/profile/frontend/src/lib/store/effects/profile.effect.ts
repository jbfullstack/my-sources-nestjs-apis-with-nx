import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';


import { CurrentUserInterface} from '@jbhive/types_fe';
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
                    map((user: CurrentUserInterface) => {
                        this.snackbar.openDefaultSnackBar(`Success: profile update (you may need to re-loggin to see changes)`)
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

    constructor(
        private actions$: Actions, 
        private profileService: ProfileService, 
        private snackbar: SnackBarComponent
    ) {}
}
