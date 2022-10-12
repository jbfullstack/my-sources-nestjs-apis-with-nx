import { createEffect, ofType, Actions } from '@ngrx/effects'


import { catchError, of, } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

import { BackendErrorsInterface, UserInterface, TagInterface, UsersListStateInterface } from '@jbhive/types_fe';
import { Router } from '@angular/router';
import { SnackBarColorEnum, SnackBarComponent } from '@jbhive/snackbar';
import { SourceStore } from '../source.store';
import { SourceService } from '../../services/source.service';


@Injectable()
export class SourceEffect {


    // updateSearchUserInput$ = createEffect( () => 
    //     this.actions$.pipe(
    //         ofType(updateSearchUserInputAction),
    //         switchMap( (action) => {
    //             this.adminStore.loadSearchUserInput(action.newValue)
    //             return of(updateSearchUserInputSuccessAction())
    //         })
    //     )
    // )

    constructor(
        private actions$: Actions, 
        private sourceService: SourceService, 
        private sourceStore: SourceStore,
        private router: Router,
        private snackbar: SnackBarComponent
    ) {}
}