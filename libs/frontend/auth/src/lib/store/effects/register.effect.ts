import { createEffect, ofType, Actions, Effect } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Injectable } from "@angular/core";

import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register-action";
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '@jbhive_fe/types';


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

                    catchError( () => {
                        // of => produce an observable, bcs the action is not an  observable
                        return of(registerFailureAction())
                    })
                )
            })
        ) 
    )

    constructor(private actions$: Actions, private authService: AuthService) {}
}