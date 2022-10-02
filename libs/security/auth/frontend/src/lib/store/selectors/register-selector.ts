import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthStateInterface } from '@jbhive/types_fe'

export const registerFeatureSelector = createFeatureSelector<AuthStateInterface>('auth')

export const isSubmittingSelector = createSelector(
    registerFeatureSelector, 
    (registerState: AuthStateInterface) => registerState.register.isSubmitting
)

export const validationErrorSelector = createSelector(
    registerFeatureSelector, 
    (registerState: AuthStateInterface) => registerState.register.validationErrors
)

export const isAccountCreated = createSelector(
    registerFeatureSelector, 
    (registerState: AuthStateInterface) => registerState.register.isAccountCreated
)

