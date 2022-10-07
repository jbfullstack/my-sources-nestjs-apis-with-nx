import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { AdminStateInterface, CurrentUserInterface } from "@jbhive/types_fe";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction } from "../actions/admin.action";
import { AdminService } from "../../services/admin.service";
import { Store } from "@ngrx/store";


export const initialState: AdminStateInterface = {
    desactivatedUsersList: [],
    // manageUsersList: [],
    // searchInput: '',
    pending: true,
    errors: null
}

@Injectable()
export class AdminStore extends ComponentStore<AdminStateInterface> {

    errors$ = this.select(state => state.errors)
    pending$ = this.select(state => state.pending)
    desactivatedUsersList$ = this.select(state => state.desactivatedUsersList)


    loadDesactivatedUsers = this.updater( (state, users: CurrentUserInterface[] | null) => ({
        ...state,
        desactivatedUsersList: users || []
    })
    
    )

    // loadDesactivatedUsers = this.effect( 
    //     // switchMap( () => {
    //         return this.adminService.loadAllDesactivatedUsers().pipe(
    //             tapResponse(
    //                 (desactivatedUsers: CurrentUserInterface[]) => {
    //                     this.setState({
    //                         desactivatedUsersList: desactivatedUsers,
    //                         pending: false,
    //                         errors: null,
    //                     })
    //                     this.adminService.dispatch(loadDesactivatedUsersSuccessAction({desactivatedUsers}))
    //                 },
    //                 (errorResponse: HttpErrorResponse) => {
    //                     this.setState({
    //                         desactivatedUsersList: [],
    //                         pending: false,
    //                         errors: errorResponse.message,
    //                     })  
    //                     this.adminService.dispatch(loadDesactivatedUsersFailureAction({errors: errorResponse.message}))           
    //                 }
    //             )
    //         )
    //     // })
    // )

    constructor(private adminService : AdminService){
        super(initialState)
    }

    // desactivatedUsers$: Observable<CurrentUserInterface[]> = this.select( (state) => state.desactivatedUsersList)
}