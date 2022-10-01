import { createReducer, on, State, Action } from "@ngrx/store";

import { AuthStateInterface } from "@jbhive_fe/types";

import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login-action";
import { registerAction, registerSuccessAction, registerFailureAction } from "../actions/register-action";



const initialState: AuthStateInterface = {
    login: {
        isSubmitting: false,
        currentUser: null,
        isLoggedIn: null,
        validationErrors: null
    },
    register:{
        isSubmitting: false,
        isAccountCreated: null,
        validationErrors: null
    }
}

const authReducer = createReducer(
    initialState, 
    on(
        loginAction, 
        (state): AuthStateInterface => 
        ({
            ...state,
            login: {
                ...state.login,
                isSubmitting: true,
                validationErrors: null
            },
            
        })
    ),

    on(
        loginSuccessAction, 
        (state, action): AuthStateInterface => 
        ({
            ...state,
            login: {
                ...state.login,
                isLoggedIn: true,
                isSubmitting: false,
                currentUser: action.currentUser,                
            },
        })
    ),

    on(
        loginFailureAction, 
        (state, action): AuthStateInterface => 
        ({
            ...state,
            login: {
                ...state.login,
                isLoggedIn: false,
                isSubmitting: false,
                validationErrors: action.errors,               
            },
        })
    ),

    on(
        registerAction, 
        (state): AuthStateInterface => 
        ({  
            ...state,
            register: {
                ...state.register,
                isSubmitting: true,
                validationErrors: null,               
            },
        })
    ),

    on(
        registerSuccessAction, 
        (state, action): AuthStateInterface => 
        ({
            ...state,
            register: {
                ...state.register,
                isSubmitting: false,
                isAccountCreated: true,             
            },
        })
    ),

    on(
        registerFailureAction, 
        (state, action): AuthStateInterface => 
        ({
            ...state,
            register: {
                ...state.register,
                isAccountCreated: false,
                isSubmitting: false,
                validationErrors: action.errors,               
            },
        })
    ),
)

export function reducers(state: AuthStateInterface, action: Action){
    return authReducer(state, action)
}