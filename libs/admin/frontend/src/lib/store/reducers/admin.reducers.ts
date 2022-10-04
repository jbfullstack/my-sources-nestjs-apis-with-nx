import { createReducer, on, State, Action } from "@ngrx/store";

import { AdminStateInterface } from "@jbhive/types_fe";

import { loadDesactivatedUsersAction, loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction, activateAction, activateSuccessAction, } from "../actions/admin.action";



const initialState: AdminStateInterface = {
    desactivatedUsersList: { users: []},
    manageUsersList: { users: []},
    searchInput: '',
    isLoading: false,
    validationErrors: null
}

const adminReducer = createReducer(
    initialState, 
    on(
        loadDesactivatedUsersAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            isLoading: true
        })
    ),
    on(
        loadDesactivatedUsersSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            isLoading: false,
            desactivatedUsersList: action.desactivatedUsers
        })
    ),
    on(
        loadDesactivatedUsersFailureAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            isLoading: false,
            validationErrors: action.errors
        })
    ),

    on(
        activateAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            isLoading: true
        })
    ),

    // on(
    //     activateSuccessAction, 
    //     (state, action): AdminStateInterface => 
    //     ({
    //         ...state,
    //         desactivatedUsersList: {
    //             users: state.desactivatedUsersList.users.filter( user => user.id === action.)
    //         }
    //         // update user in the store
            
    //     })
    // ),
)

export function reducers(state: AdminStateInterface, action: Action){
    return adminReducer(state, action)
}