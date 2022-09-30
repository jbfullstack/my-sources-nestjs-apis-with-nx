import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthStateInterface } from '../types/auth-state.interface'
import { AppStateInterface } from '@jbhive_fe/types'

export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth')

export const isSubmittingSelector = createSelector(
    authFeatureSelector, 
    (authState: AuthStateInterface) => authState.isSubmitting
)

export const validationErrorSelector = createSelector(
    authFeatureSelector, 
    (authState: AuthStateInterface) => authState.validationErrors
)

