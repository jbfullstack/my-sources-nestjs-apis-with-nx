import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register-action";
import { AuthService } from '../../services/auth.service';
import { BackendErrorsInterface, CurrentUserInterface } from '@jbhive_fe/types';
import { PersistanceService } from '../../services/persistance.service';
import { Router } from '@angular/router';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login-action';


@Injectable()
export class LoginEffect {

    login$ = createEffect( () => 
        this.actions$.pipe(
            ofType(loginAction),
            switchMap(({request}) => {
                // pipe map => bcs login is an asynchronous call (and so produce an observable)
                return this.authService.login(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        // register the Jwt token
                        this.persistanceService.set('accessToken', currentUser.token)
                        //
                        return loginSuccessAction({currentUser})
                    }),

                    catchError( (errorResponse: HttpErrorResponse) => {
                        // of => produce an observable, bcs the action is not an  observable
                        return of(loginFailureAction({errors: JSON.parse(errorResponse.message).errors}))
                    })
                )
            })
        ) 
    )

    redirectAfterSubmit$ = createEffect( () => 
        this.actions$.pipe(
            ofType(loginSuccessAction),
            tap( () => {
                this.router.navigateByUrl('/')
            })
        ),
        {dispatch: false}
    )

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private persistanceService: PersistanceService,
        private router: Router
    ) {}
}