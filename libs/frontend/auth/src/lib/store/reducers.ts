import { createReducer, on, State, Action } from "@ngrx/store";
import { AuthStateInterface } from "../types/auth-state.interface";
import { registerAction } from "./action";


const initialState: AuthStateInterface = {
    isSubmitting: false
}

const authReducer = createReducer(
    initialState, 
    on(
        registerAction, 
        (state): AuthStateInterface => 
        ({
            ...State,
            isSubmitting: true
        })
    )
)

export function reducers(state: AuthStateInterface, action: Action){
    return authReducer(state, action)
}