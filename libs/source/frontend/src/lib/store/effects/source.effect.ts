import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { BackendErrorsInterface, UserInterface, TagInterface, SourceInterface, SourceTypeInterface } from '@jbhive/types_fe';
import { Router } from '@angular/router';
import { SnackBarColorEnum, SnackBarComponent } from '@jbhive/snackbar';
import { SourceStore } from '../source.store';
import { SourceService } from '../../services/source.service';
import { addTagAction, addTagSuccessAction, createSourceAction, createSourceFailureAction, createSourceSuccessAction, loadSourcesAction, loadSourcesFailureAction, loadSourcesSuccessAction, loadTagsAction, loadTagsFailureAction, loadTagsSuccessAction, loadTypesAction, loadTypesFailureAction, loadTypesSuccessAction, removeTagAction, removeTagSuccessAction, updateSearchInputAction, updateSearchInputSuccessAction } from '../actions/source.action';


@Injectable()
export class SourceEffect {
    

    loadSources$ = createEffect( () => 
        this.actions$.pipe(
            ofType(loadSourcesAction),
            switchMap( () => {
                return this.sourceService.loadPublicAndOwnedSources().pipe(
                    map((sources: SourceInterface[]) => {
                        return loadSourcesSuccessAction({ sources })
                    }),
                    catchError( (errorResponse: HttpErrorResponse) => {
                        this.snackbar.openSnackBarError(`Error: can't retrieve sources from server: \n ${errorResponse.message}`)
                        return of(loadSourcesFailureAction({errors: errorResponse.message}))
                    })
                )
            })
        )
    )

    loadTypes$ = createEffect( () => 
    this.actions$.pipe(
        ofType(loadTypesAction),
        switchMap( () => {
            return this.sourceService.loadTypes().pipe(
                map((types: SourceTypeInterface[]) => {
                    return loadTypesSuccessAction({ types })
                }),
                catchError( (errorResponse: HttpErrorResponse) => {
                    this.snackbar.openSnackBarError(`Error: can't retrieve source types from server: \n ${errorResponse.message}`)
                    return of(loadTypesFailureAction({errors: errorResponse.message}))
                })
            )
        })
    )
)

    loadTags$ = createEffect( () => 
        this.actions$.pipe(
            ofType(loadTagsAction),
            switchMap( () => {
                return this.sourceService.loadTags().pipe(
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

    addTagFilter$ = createEffect( () => 
        this.actions$.pipe(
            ofType(addTagAction),
            switchMap( (action) => {
                // this.sourceStore.addTagFilter({ id: action.id })
                return of(addTagSuccessAction({ id: action.id }))
            })
        )
    )

    removeTagFilter$ = createEffect( () => 
        this.actions$.pipe(
            ofType(removeTagAction),
            switchMap( (action) => {
                // this.sourceStore.addTagFilter({ id: action.id })
                return of(removeTagSuccessAction({ id: action.id }))
            })
        )
    )



    updateSearchUserInput$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateSearchInputAction),
            switchMap( (action) => {
                this.sourceStore.loadSearchInput(action.search)
                return of(updateSearchInputSuccessAction())
            })
        )
    )

    createSource$ = createEffect( () => 
    this.actions$.pipe(
        ofType(createSourceAction),
        switchMap( (action) => {
            return this.sourceService.createSource(action.request).pipe(
                map((source: SourceInterface) => {
                    this.snackbar.openSnackBarError(`Source ${source.title} created!`)
                    return createSourceSuccessAction({ source })
                }),
                catchError( (errorResponse: HttpErrorResponse) => {
                    this.snackbar.openSnackBarError(`Error: can't retrieve tags from server: \n ${errorResponse.message}`)
                    return of(createSourceFailureAction({errors: errorResponse.message}))
                })
            )
        })
    )
)

    constructor(
        private actions$: Actions, 
        private sourceService: SourceService, 
        private sourceStore: SourceStore,
        private router: Router,
        private snackbar: SnackBarComponent
    ) {}
}