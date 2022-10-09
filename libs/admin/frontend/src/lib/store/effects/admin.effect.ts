import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { AdminService } from '../../services/admin.service';
import { BackendErrorsInterface, CurrentUserInterface, UsersListStateInterface } from '@jbhive/types_fe';
import { Router } from '@angular/router';
import { 
    loadDesactivatedUsersAction, activateAction, activateFailureAction, activateSuccessAction, 
    loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction, deleteAction, 
    deleteFailureAction, deleteSuccessAction, loadActivatedUsersAction, loadActivatedUsersSuccessAction, 
    loadActivatedUsersFailureAction, desactivateAction, desactivateFailureAction, desactivateSuccessAction, 
    updateRoleAction, updateRoleFailureAction, updateRoleSuccessAction, updateSearchInputAction, updateSearchInputSuccessAction, generatePasswordAction, generatePasswordFailureAction, generatePasswordSuccessAction 
} from '../actions/admin.action';
import { AdminStore } from '../stores/admin.store';


@Injectable()
export class AdminEffect {

    loadDesactivatedUsers$ = createEffect( () => 
        this.actions$.pipe(
            ofType(loadDesactivatedUsersAction),
            switchMap( () => {
                return this.adminService.loadAllDesactivatedUsers().pipe(
                    map((desactivatedUsers: CurrentUserInterface[]) => {
                        return loadDesactivatedUsersSuccessAction({ desactivatedUsers })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        return of(loadDesactivatedUsersFailureAction({errors: JSON.parse(errorResponse.message).errors}))
                    })
                )
            })
        )
    )

    loadActivatedUsers$ = createEffect( () => 
        this.actions$.pipe(
            ofType(loadActivatedUsersAction),
            switchMap( () => {
                return this.adminService.loadAllActivatedUsers().pipe(
                    map((activatedUsers: CurrentUserInterface[]) => {
                        return loadActivatedUsersSuccessAction({ activatedUsers })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        return of(loadActivatedUsersFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    activateUsers$ = createEffect( () => 
        this.actions$.pipe(
            ofType(activateAction),
            switchMap( (action) => {
                return this.adminService.activate(action.userId).pipe(
                    map((user: CurrentUserInterface) => {
                        return activateSuccessAction({ userId: action.userId })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        return of(activateFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    desactivateUsers$ = createEffect( () => 
        this.actions$.pipe(
            ofType(desactivateAction),
            switchMap( (action) => {
                return this.adminService.desactivate(action.userId).pipe(
                    map((user: CurrentUserInterface) => {
                        return desactivateSuccessAction({ userId: action.userId })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        return of(desactivateFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    updateRole$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateRoleAction),
            switchMap( (action) => {
                return this.adminService.updateRole(action.userId, action.newRoleId).pipe(
                    map((user: CurrentUserInterface) => {
                        return updateRoleSuccessAction({ userId: action.userId })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        return of(updateRoleFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    updateSearchInput$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateSearchInputAction),
            switchMap( (action) => {
                this.adminStore.loadSearchInput(action.newValue)
                return of(updateSearchInputSuccessAction())
            })
        )
    )

    deleteUsers$ = createEffect( () => 
        this.actions$.pipe(
            ofType(deleteAction),
            switchMap( (action) => {
                return this.adminService.deleteUser(action.userId).pipe(
                    map((deleted: boolean) => {
                        // call backend
                        // adminService.activate()
                        return deleteSuccessAction({ userId: action.userId })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        return of(deleteFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    generatePassword$ = createEffect( () => 
        this.actions$.pipe(
            ofType(generatePasswordAction),
            switchMap( (action) => {
                return this.adminService.generatePassword(action.userId, action.password).pipe(
                    map((user: CurrentUserInterface) => {
                        return generatePasswordSuccessAction()
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        return of(generatePasswordFailureAction({errors: errorResponse.message}))
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
        private adminStore: AdminStore,
        private router: Router
    ) {}
}