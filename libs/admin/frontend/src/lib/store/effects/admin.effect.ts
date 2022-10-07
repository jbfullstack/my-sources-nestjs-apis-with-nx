import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { AdminService } from '../../services/admin.service';
import { BackendErrorsInterface, CurrentUserInterface } from '@jbhive/types_fe';
import { Router } from '@angular/router';
import { loadDesactivatedUsersAction, activateAction, activateFailureAction, activateSuccessAction, loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction } from '../actions/admin.action';
import { UsersListStateInterface } from 'libs/utils/types/frontend/src/lib/user-list-state.interface';


@Injectable()
export class AdminEffect {

    loadDesactivatedUsers$ = createEffect( () => 
        this.actions$.pipe(
            ofType(loadDesactivatedUsersAction),
            switchMap( () => {
                return this.adminService.loadAllDesactivatedUsers().pipe(
                    map((desactivatedUsers: CurrentUserInterface[]) => {
                        // call backend
                        // adminService.activate()

                        return loadDesactivatedUsersSuccessAction({ desactivatedUsers })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        return of(loadDesactivatedUsersFailureAction({errors: JSON.parse(errorResponse.message).errors}))
                    })
                )
            })
        )
    )

    // activate$ = createEffect( () => 
    //     this.actions$.pipe(
    //         ofType(activateAction),
    //         switchMap(({request}) => {
    //             // pipe map => bcs login is an asynchronous call (and so produce an observable)
    //             return this.adminService.activate(request.userId).pipe(
    //                 map((currentUser: CurrentUserInterface) => {
    //                     // register the Jwt token
    //                     // this.persistanceService.set('accessToken', currentUser.token)
    //                     //
    //                     return activateSuccessAction({currentUser.id})
    //                 }),

    //                 catchError( (errorResponse: HttpErrorResponse) => {
    //                     // of => produce an observable, bcs the action is not an  observable
    //                     return of(activateFailureAction({errors: JSON.parse(errorResponse.message).errors}))
    //                 })
    //             )
    //         })
    //     ) 
    // )

    // redirectAfterSubmit$ = createEffect( () => 
    //     this.actions$.pipe(
    //         ofType(loginSuccessAction),
    //         tap( () => {
    //             this.router.navigateByUrl('/profile')
    //         })
    //     ),
    //     {dispatch: false}
    // )

    constructor(
        private actions$: Actions, 
        private adminService: AdminService, 
        private router: Router
    ) {}
}