import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthStateInterface } from '@jbhive_fe/types'

export const loginFeatureSelector = createFeatureSelector<AuthStateInterface>('auth')

export const isSubmittingSelector = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login.isSubmitting
)

export const validationErrorSelector = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login.validationErrors
)

export const isLoggedInSelector = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login.isLoggedIn
)

