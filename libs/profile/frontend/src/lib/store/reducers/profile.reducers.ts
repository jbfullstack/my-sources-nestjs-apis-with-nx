import { createReducer, on, State, Action } from "@ngrx/store";

import { AdminStateInterface, CurrentUserInterface } from "@jbhive/types_fe";
import { updateUserProfileAction, updateUserProfileFailureAction, updateUserProfileSuccessAction } from "../actions/profile.action";
import { ProfileStateInterface } from "../../profile-state.interface";


const initialState : ProfileStateInterface = {    
    pending: false,
    pseudo: '',
    email: ''
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
            pending: false,
            pseudo: action.user.pseudo,
            email: action.user.email,
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

export function reducers(state: ProfileStateInterface, action: Action){
    return profileReducer(state, action)
}