import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { BackendErrorsInterface, UserInterface, TagInterface, SourceInterface } from '@jbhive/types_fe';
import { Router } from '@angular/router';
import { SnackBarColorEnum, SnackBarComponent } from '@jbhive/snackbar';
import { SourceStore } from '../source.store';
import { SourceService } from '../../services/source.service';
import { loadSourcesAction, loadSourcesFailureAction, loadSourcesSuccessAction, updateSearchInputAction, updateSearchInputSuccessAction } from '../actions/source.action';


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





    updateSearchUserInput$ = createEffect( () => 
        this.actions$.pipe(
            ofType(updateSearchInputAction),
            switchMap( (action) => {
                this.sourceStore.loadSearchInput(action.search)
                return of(updateSearchInputSuccessAction())
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