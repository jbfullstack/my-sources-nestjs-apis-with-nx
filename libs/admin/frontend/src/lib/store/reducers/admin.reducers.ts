import { createReducer, on, State, Action } from "@ngrx/store";

import { AdminStateInterface, UserInterface } from "@jbhive/types_fe";

import { loadDesactivatedUsersAction, loadDesactivatedUsersSuccessAction, loadDesactivatedUsersFailureAction, activateAction, activateSuccessAction, activateFailureAction, deleteAction, deleteSuccessAction, deleteFailureAction, loadActivatedUsersAction, loadActivatedUsersFailureAction, loadActivatedUsersSuccessAction, desactivateAction, desactivateFailureAction, desactivateSuccessAction, updateSearchUserInputAction, hideSuccessAction, hideAction, hideFailureAction, updateSearchTagInputAction, loadTagsAction, loadTagsFailureAction, loadTagsSuccessAction, createTagSuccessAction, createTagAction, createTagFailureAction, deleteTagAction, deleteTagFailureAction, deleteTagSuccessAction, } from "../actions/admin.action";
import { initialState } from "../stores/admin.store";



// const initialState: AdminStateInterface = {
//     desactivatedUsersList: [],
//     activatedUsersList: [],
//     searchUserInput: '',
//     pending: false,
//     errors: null,
//     loggedUserRoleId: 0,
//     tags: [],
//     searchTagInput: ''
// }

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
        loadTagsAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on(
        loadTagsSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            tags: action.tags
        })
    ),
    on(
        loadTagsFailureAction, 
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

    on(
        createTagAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: true,
        })
    ),
    on(
        createTagSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            tags: [...state.tags, action.tag]
        })
    ),
    on(
        createTagFailureAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),


    on(
        deleteTagAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: true,
        })
    ),
    on(
        deleteTagSuccessAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            tags: state.tags.filter( tag => tag.id !== action.tagId)
        })
    ),
    on(
        deleteTagFailureAction, 
        (state, action): AdminStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),
)

// export function getDesactivatedListForSuccessAction(userId: number, list : UserInterface[]) {
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