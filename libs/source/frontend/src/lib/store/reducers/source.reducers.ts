import { createReducer, on, State, Action } from "@ngrx/store";
import { SourceStateInterface, UserInterface } from "@jbhive/types_fe";
import { initialState } from "../source.store";



const sourceReducer = createReducer(
    initialState, 
    // on(
    //     loadSour, 
    //     (state, action): AdminStateInterface => 
    //     ({
    //         ...state,
    //         pending: true
    //     })
    // ),
    // on(
    //     loadDesactivatedUsersSuccessAction, 
    //     (state, action): AdminStateInterface => 
    //     ({
    //         ...state,
    //         pending: false,
    //         desactivatedUsersList: action.desactivatedUsers
    //     })
    // ),
    // on(
    //     loadDesactivatedUsersFailureAction, 
    //     (state, action): AdminStateInterface => 
    //     ({
    //         ...state,
    //         pending: false,
    //         errors: action.errors
    //     })
    // ),   
)

export function reducers(state: SourceStateInterface, action: Action){
    return sourceReducer(state, action)
}