import { createReducer, on, State, Action } from "@ngrx/store";

import { AdminStateInterface, CurrentUserInterface } from "@jbhive/types_fe";
import { updateUserProfileAction, updateUserProfileFailureAction, updateUserProfileSuccessAction } from "../actions/profile.action";

interface ProfileStateInterface {
    pending: boolean
}

const initialState : ProfileStateInterface = {    
    pending: false,
}

const profileReducer = createReducer(
    initialState, 
    on(
        updateUserProfileAction, 
        (state, action): ProfileStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on(
        updateUserProfileSuccessAction, 
        (state, action): ProfileStateInterface => 
        ({
            ...state,
            pending: false
        })
    ),
    on(
        updateUserProfileFailureAction, 
        (state, action): ProfileStateInterface => 
        ({
            ...state,
            pending: false
        })
    ),
)

export function reducers(state: AdminStateInterface, action: Action){
    return profileReducer(state, action)
}