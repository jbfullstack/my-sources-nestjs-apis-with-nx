import { createReducer, on, State, Action } from "@ngrx/store";

import { AdminStateInterface, CurrentUserInterface } from "@jbhive/types_fe";

import { loadDesactivatedUsersAction, loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction, activateAction, activateSuccessAction, activateFailureAction, deleteAction, deleteSuccessAction, deleteFailureAction, } from "../actions/admin.action";



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

    on(
        deleteAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),

    on(
        deleteSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            desactivatedUsersList: state.desactivatedUsersList.filter( user => user.id !== action.userId)
        })
    ),

    on(
        deleteFailureAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),
)

// export function getDesactivatedListForSuccessAction(userId: number, list : CurrentUserInterface[]) {
//     console.log('getDesactivatedListForSuccessAction() -> list:', list)
//     if (list.length === 1 && list[0].id === userId) {
//         console.log('return []')
//         return []
//     } else {
//         const res = list.filter( user => user.id !== userId)
//         console.log('res filter: ', res)
//         return res
//     }
// }

export function reducers(state: AdminStateInterface, action: Action){
    return adminReducer(state, action)
}