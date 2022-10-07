import { createReducer, on, State, Action } from "@ngrx/store";

import { AdminStateInterface } from "@jbhive/types_fe";

import { loadDesactivatedUsersAction, loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction, activateAction, activateSuccessAction, activateFailureAction, } from "../actions/admin.action";



const initialState: AdminStateInterface = {
    desactivatedUsersList: [],
    // manageUsersList: [],
    // searchInput: '',
    pending: false,
    errors: null
}

const adminReducer = createReducer(
    initialState, 
    on(
        loadDesactivatedUsersAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on(
        loadDesactivatedUsersSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            desactivatedUsersList: action.desactivatedUsers
        })
    ),
    on(
        loadDesactivatedUsersFailureAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),

    on(
        activateAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),

    on(
        activateSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            desactivatedUsersList: state.desactivatedUsersList.filter( user => user.id !== action.userId)
        })
    ),

    on(
        activateFailureAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
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