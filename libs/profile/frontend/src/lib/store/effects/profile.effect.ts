import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';


import { BackendErrorsInterface, CurrentUserInterface, TagInterface, UsersListStateInterface } from '@jbhive/types_fe';
import { Router } from '@angular/router';

import { SnackBarColorEnum, SnackBarComponent } from '@jbhive/snackbar';
import { updateUserProfileAction, updateUserProfileFailureAction, updateUserProfileSuccessAction } from '../actions/profile.action';
import { ProfileService } from '../../profile.service';


@Injectable()
export class ProfileEffect {
    

    // updateUserProfile$ = createEffect( () => 
    //     this.actions$.pipe(
    //         ofType(updateUserProfileAction),
    //         switchMap( (action) => {
    //             return this.profileService.updateUserProfile(action.request).pipe(
    //                 map((user: CurrentUserInterface) => {
    //                     this.snackbar.openDefaultSnackBar(`Success: profile update'`)
    //                     return updateUserProfileSuccessAction({user})
    //                 }),
    //                 catchError( (errorResponse: HttpErrorResponse) => {
    //                     this.snackbar.openSnackBarError(`Error: can't update profile: \n ${errorResponse.message}`)
    //                     return of(updateUserProfileFailureAction({errors: errorResponse.message}))
    //                 })
    //             )
    //         })
    //     )
    // )

    constructor(
        private actions$: Actions, 
        // private profileService: ProfileService, 
        private router: Router,
        private snackbar: SnackBarComponent
    ) {}
}
