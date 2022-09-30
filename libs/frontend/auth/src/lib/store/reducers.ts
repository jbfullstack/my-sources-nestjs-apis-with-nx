import { createReducer, on, State, Action } from "@ngrx/store";

import { AuthStateInterface } from "../types/auth-state.interface";
import { registerAction, registerFailureAction, registerSuccessAction } from "./actions/register-action";

import { BackendErrorsInterface } from "@jbhive_fe/types";



const initialState: AuthStateInterface = {
    isSubmitting: false,
    currentUser: null,
    isLoggedIn: null,
    validationErrors: null
}

const authReducer = createReducer(
    initialState, 
    on(
        registerAction, 
        (state): AuthStateInterface => 
        ({
            ...state,
            isSubmitting: true,
            validationErrors: null
        })
    ),

    on(
        registerSuccessAction, 
        (state, action): AuthStateInterface => 
        ({
            ...state,
            isSubmitting: false,
            currentUser: action.currentUser,
            isLoggedIn: true,
        })
    ),

    on(
        registerFailureAction, 
        (state, action): AuthStateInterface => 
        ({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors,
            isLoggedIn: false,
        })
    )
)

export function reducers(state: AuthStateInterface, action: Action){
    return authReducer(state, action)
}