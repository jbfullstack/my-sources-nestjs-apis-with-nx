import { createEffect, ofType, Actions, Effect } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register-action";
import { AuthService } from '../../services/auth.service';
import { BackendErrorsInterface, CurrentUserInterface } from '@jbhive_fe/types';


@Injectable()
export class RegisterEffect {

    register$ = createEffect( () => 
        this.actions$.pipe(
            ofType(registerAction),
            switchMap(({request}  ) => {
                // pipe map => bcs register is an asynchronous call (and so produce an observable)
                return this.authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        return registerSuccessAction({currentUser})
                    }),

                    catchError( (errorResponse: HttpErrorResponse) => {
                        // TODO : update backend to receive the proper errors
                        // ex: {'register': ['err1', 'eer2'], 'grammaire':['tu sais pas ecrire']}
                        const errors : BackendErrorsInterface = {
                            register: [errorResponse.message]
                        }

                        // of => produce an observable, bcs the action is not an  observable
                        return of(registerFailureAction({errors: errors}))
                    })
                )
            })
        ) 
    )

    constructor(private actions$: Actions, private authService: AuthService) {}
}