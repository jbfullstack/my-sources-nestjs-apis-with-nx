import { createReducer, on, State, Action } from "@ngrx/store";

import { AdminStateInterface, CurrentUserInterface } from "@jbhive/types_fe";

import { loadDesactivatedUsersAction, loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction, activateAction, activateSuccessAction, activateFailureAction, deleteAction, deleteSuccessAction, deleteFailureAction, loadActivatedUsersAction, loadActivatedUsersFailureAction, loadActivatedUsersSuccessAction, desactivateAction, desactivateFailureAction, desactivateSuccessAction, updateSearchUserInputAction, hideSuccessAction, hideAction, hideFailureAction, updateSearchTagInputAction, } from "../actions/admin.action";



const initialState: AdminStateInterface = {
    desactivatedUsersList: [],
    activatedUsersList: [],
    searchUserInput: '',
    pending: false,
    errors: null,
    loggedUserRoleId: 0,
    searchTagInput: ''
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
        loadActivatedUsersAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on(
        loadActivatedUsersSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            activatedUsersList: action.activatedUsers
        })
    ),
    on(
        loadActivatedUsersFailureAction, 
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
            activatedUsersList: [...state.activatedUsersList, state.desactivatedUsersList.filter( user => user.id === action.userId)[0]],
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
        desactivateAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),

    on(
        desactivateSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            desactivatedUsersList: [...state.desactivatedUsersList, state.activatedUsersList.filter( user => user.id === action.userId)[0]],
            activatedUsersList: state.activatedUsersList.filter( user => user.id !== action.userId),            
        })
    ),

    on(
        desactivateFailureAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),


    on(
        updateSearchUserInputAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            // pending: false,
            searchUserInput: action.newValue
        })
    ),

    on(
        updateSearchTagInputAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            searchTagInput: action.newValue
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
            desactivatedUsersList: state.desactivatedUsersList.filter( user => user.id !== action.userId),
            activatedUsersList: state.activatedUsersList.filter( user => user.id !== action.userId)
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

    on(
        hideAction,
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
        })
    ),
    on(
        hideSuccessAction,
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            desactivatedUsersList: state.desactivatedUsersList.filter( user => user.id === action.userId)
        })
    ),
    on(
        hideFailureAction,
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
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