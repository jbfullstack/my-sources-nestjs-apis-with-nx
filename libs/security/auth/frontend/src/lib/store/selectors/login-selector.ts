import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthStateInterface, CurrentUserInterface } from '@jbhive/types_fe'

export const loginFeatureSelector = createFeatureSelector<AuthStateInterface>('auth')

export const isSubmittingSelector = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login.isSubmitting
)

export const validationErrorSelector = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login?.validationErrors
)

export const isLoggedInSelector = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login?.isLoggedIn
)

export const loggedUserRole = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login.currentUser?.role?.id
)

export const currentUserSelector = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login.currentUser
)

export const userTokenSelector = createSelector(
    loginFeatureSelector, 
    (loginState: AuthStateInterface) => loginState.login.currentUser?.token
)






