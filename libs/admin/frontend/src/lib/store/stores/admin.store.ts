import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { AdminStateInterface, CurrentUserInterface, TagInterface } from "@jbhive/types_fe";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction } from "../actions/admin.action";
import { AdminService } from "../../services/admin.service";
import { Store } from "@ngrx/store";


export const initialState: AdminStateInterface = {
    desactivatedUsersList: [],
    activatedUsersList: [],
    searchUserInput: '',
    pending: false,
    errors: null,
    loggedUserRoleId: 0,
    tags: [],
    searchTagInput: ''
}

@Injectable()
export class AdminStore extends ComponentStore<AdminStateInterface> {    

    errors$ = this.select(state => state.errors)
    pending$ = this.select(state => state.pending)
    desactivatedUsersList$ = this.select(state => state.desactivatedUsersList)
    activatedUsersList$ = this.select(state => state.activatedUsersList)
    loggedUserRoleId$ = this.select(state => state.loggedUserRoleId)
    searchUserInput$ = this.select(state => state.searchUserInput)
    filteredActivatedUsers$ = this.select( 
        ({activatedUsersList, searchUserInput: searchUserInput}) => activatedUsersList.filter( 
            (user) => user.pseudo.toLowerCase().includes(searchUserInput.toLowerCase()) || user.email.toLowerCase().includes(searchUserInput.toLowerCase())
        )
    )

    tags$ = this.select(state => state.tags)
    searchTagInput$ = this.select(state => state.searchTagInput)
    filteredTags$ = this.select( 
        ({tags, searchTagInput: searchTagInput}) => tags.filter( 
            (tag) => tag.title.toLowerCase().includes(searchTagInput.toLowerCase()) || tag.description.toLowerCase().includes(searchTagInput.toLowerCase())
        )
    )
    

    loadLoggedUserRoleId = this.updater( (state, roleId: number | null) => ({
            ...state,
            loggedUserRoleId: roleId || 0
        })    
    )

    loadDesactivatedUsers = this.updater( (state, users: CurrentUserInterface[] | null) => ({
            ...state,
            desactivatedUsersList: users || []
        })    
    )
    
    loadActivatedUsers = this.updater( (state, users: CurrentUserInterface[] | null) => ({
            ...state,
            activatedUsersList: users || []
        }) 
    )

    loadTags = this.updater( (state, tags: TagInterface[] | null) => ({
            ...state,
            tags: tags || []
        }) 
    )
    
    loadSearchUserInput = this.updater( (state, search: string | null) => ({
            ...state,
            searchUserInput: search || ''
        }) 
    )

    loadSearchTagInput = this.updater( (state, search: string | null) => ({
        ...state,
        searchTagInput: search || ''
    }) 
)
    
    constructor(private adminService : AdminService){
        super(initialState)
    }
}