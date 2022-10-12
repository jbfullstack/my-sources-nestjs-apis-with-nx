import { createReducer, on, State, Action } from "@ngrx/store";

import { AdminStateInterface, ProfileUserStateInterface, UserInterface } from "@jbhive/types_fe";
import { updateUserProfileAction, updateUserProfileFailureAction, updateUserProfileSuccessAction } from "../actions/profile.action";
import { ProfileStateInterface } from "../../profile-state.interface";
import { initialState } from "../store/profile.store";


// const initialState : ProfileStateInterface = {    
//     pending: false,
//     user: {

//     }
// }

const profileReducer = createReducer(
    initialState, 
    on(
        updateUserProfileAction, 
        (state, action): ProfileUserStateInterface => 
        ({
            ...state,
            pending: true,
        })
    ),
    on(
        updateUserProfileSuccessAction, 
        (state, action): ProfileUserStateInterface => 
        ({
            ...state,
            pending: false,
            user : action.user
        })
    ),
    on(
        updateUserProfileFailureAction, 
        (state, action): ProfileUserStateInterface => 
        ({
            ...state,
            pending: false
        })
    ),
)

export function reducers(state: ProfileUserStateInterface, action: Action){
    return profileReducer(state, action)
}