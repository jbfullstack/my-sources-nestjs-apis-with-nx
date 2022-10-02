import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { registerAction, registerFailureAction, registerSuccessAction } from "../actions/register-action";
import { AuthService } from '../../services/auth.service';
import { BackendErrorsInterface, CurrentUserInterface } from '@jbhive/types_fe';
import { PersistanceService } from '../../services/persistance.service';
import { Router } from '@angular/router';


@Injectable()
export class RegisterEffect {

    register$ = createEffect( () => 
        this.actions$.pipe(
            ofType(registerAction),
            switchMap(({request}) => {
                // pipe map => bcs register is an asynchronous call (and so produce an observable)
                return this.authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        
                        //
                        return registerSuccessAction({currentUser})
                    }),

                    catchError( (errorResponse: HttpErrorResponse) => {
                        // of => produce an observable, bcs the action is not an  observable
                        return of(registerFailureAction({errors: JSON.parse(errorResponse.message).errors}))
                    })
                )
            })
        ) 
    )

    // redirectAfterSubmit$ = createEffect( () => 
    //     this.actions$.pipe(
    //         ofType(registerSuccessAction),
    //         tap( () => {
    //             this.router.navigateByUrl('/')
    //         })
    //     ),
    //     // {dispatch: false}
    // )

    constructor(
        private actions$: Actions, 
        private authService: AuthService, 
        private persistanceService: PersistanceService,
        private router: Router
    ) {}
}