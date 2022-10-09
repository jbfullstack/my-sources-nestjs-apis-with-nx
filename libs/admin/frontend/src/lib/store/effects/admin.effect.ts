import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { AdminService } from '../../services/admin.service';
import { BackendErrorsInterface, CurrentUserInterface, TagInterface, UsersListStateInterface } from '@jbhive/types_fe';
import { Router } from '@angular/router';
import { 
    loadDesactivatedUsersAction, activateAction, activateFailureAction, activateSuccessAction, 
    loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction, deleteAction, 
    deleteFailureAction, deleteSuccessAction, loadActivatedUsersAction, loadActivatedUsersSuccessAction, 
    loadActivatedUsersFailureAction, desactivateAction, desactivateFailureAction, desactivateSuccessAction, 
    updateRoleAction, updateRoleFailureAction, updateRoleSuccessAction, updateSearchUserInputAction, updateSearchUserInputSuccessAction, generatePasswordAction, generatePasswordFailureAction, generatePasswordSuccessAction, hideAction, hideFailureAction, hideSuccessAction, updateSearchTagInputAction, updateSearchTagInputSuccessAction, loadTagsAction, loadTagsSuccessAction, loadTagsFailureAction, updateTagAction, updateTagFailureAction, updateTagSuccessAction, createTagAction, createTagFailureAction, createTagSuccessAction, deleteTagAction, deleteTagFailureAction, deleteTagSuccessAction 
} from '../actions/admin.action';
import { AdminStore } from '../stores/admin.store';
import { SnackBarColorEnum, SnackBarComponent } from '@jbhive/snackbar';


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
                        this.snackbar.openSnackBarError(`Error: can't retrieve desactivated users from server: ${errorResponse.message}`)
                        return of(loadDesactivatedUsersFailureAction({errors: errorResponse.message}))
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
                        this.snackbar.openSnackBarError(`Error: can't retrieve activated users from server: \n ${errorResponse.message}`)
                        return of(loadActivatedUsersFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    loadTags$ = createEffect( () => 
        this.actions$.pipe(
            ofType(loadTagsAction),
            switchMap( () => {
                return this.adminService.loadAllTags().pipe(
                    map((tags: TagInterface[]) => {
                        return loadTagsSuccessAction({ tags })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`Error: can't retrieve tags from server: \n ${errorResponse.message}`)
                        return of(loadTagsFailureAction({errors: errorResponse.message}))
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
                        this.snackbar.openSnackBarError(`Error: can't activate the user: \n ${errorResponse.message}`)
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
                        this.snackbar.openSnackBarError(`Error: can't desactivate the user: \n ${errorResponse.message}`)
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
                        this.snackbar.openDefaultSnackBar(`Success: user's role updated'`)
                        return updateRoleSuccessAction({ userId: action.userId })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`Error: can't update the user's role: \n ${errorResponse.message}`)
                        return of(updateRoleFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    updateSearchUserInput$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateSearchUserInputAction),
            switchMap( (action) => {
                this.adminStore.loadSearchUserInput(action.newValue)
                return of(updateSearchUserInputSuccessAction())
            })
        )
    )

    updateSearchTagInput$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateSearchTagInputAction),
            switchMap( (action) => {
                this.adminStore.loadSearchTagInput(action.newValue)
                return of(updateSearchTagInputSuccessAction())
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
                        this.snackbar.openSnackBarError(`Error: can't delete the user: \n ${errorResponse.message}`)
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
                        this.snackbar.openDefaultSnackBar(`Success: user's password updated'`)
                        return generatePasswordSuccessAction()
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`Error: can't update the user's password: \n ${errorResponse.message}`)
                        return of(generatePasswordFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    hideUser$ = createEffect( () => 
        this.actions$.pipe(
            ofType(hideAction),
            switchMap( (action) => {
                return this.adminService.hideUser(action.userId).pipe(
                    map((user: CurrentUserInterface) => {
                        this.snackbar.openDefaultSnackBar(`This dude '${user.pseudo}' will no longer be a trouble ;)`)
                        return hideSuccessAction({userId: user.id})
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`Error: can't hide the user: \n ${errorResponse.message}`)
                        return of(hideFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    updateTag$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateTagAction),
            switchMap( (action) => {
                return this.adminService.updateTag(action.id, action.title, action.description).pipe(
                    map((tag: TagInterface) => {
                        this.snackbar.openDefaultSnackBar(`Success: tag updated'`)
                        return updateTagSuccessAction({ tagId: tag.id })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`Error: can't update tag: \n ${errorResponse.message}`)
                        return of(updateTagFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    createTag$ = createEffect( () => 
        this.actions$.pipe(
            ofType(createTagAction),
            switchMap( (action) => {
                return this.adminService.createTag(action.title, action.description).pipe(
                    map((tag: TagInterface) => {
                        this.snackbar.openDefaultSnackBar(`Success: tag created'`)
                        return createTagSuccessAction({tag})
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`Error: can't create tag: \n ${errorResponse.message}`)
                        return of(createTagFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    deleteTag$ = createEffect( () => 
        this.actions$.pipe(
            ofType(deleteTagAction),
            switchMap( (action) => {
                return this.adminService.deleteTag(action.id).pipe(
                    map((tag: TagInterface) => {
                        this.snackbar.openDefaultSnackBar(`Success: tag deleted'`)
                        return deleteTagSuccessAction({tagId: action.id})
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`Error: can't delete tag: \n ${errorResponse.message}`)
                        return of(deleteTagFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    constructor(
        private actions$: Actions, 
        private adminService: AdminService, 
        private adminStore: AdminStore,
        private router: Router,
        private snackbar: SnackBarComponent
    ) {}
}