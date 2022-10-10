import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AdminStateInterface, } from '@jbhive/types_fe'
import { ProfileStateInterface } from '../../profile-state.interface'

export const loginFeatureSelector = createFeatureSelector<ProfileStateInterface>('profile')

export const isPendingSelector = createSelector(
    loginFeatureSelector, 
    (adminState: ProfileStateInterface) => adminState.pending
)

export const pseudoSelector = createSelector(
    loginFeatureSelector, 
    (adminState: ProfileStateInterface) => adminState.pseudo
)

export const emailSelector = createSelector(
    loginFeatureSelector, 
    (adminState: ProfileStateInterface) => adminState.email
)

// export const tagsSelector = createSelector(
//     loginFeatureSelector, 
//     (adminState: AdminStateInterface) => adminState.tags
// )
// export const validationErrorSelector = createSelector(
//     loginFeatureSelector, 
//     (loginState: AuthStateInterface) => loginState.login.validationErrors
// )

// // export const isLoggedInSelector = createSelector(
// //     loginFeatureSelector, 
// //     (loginState: AuthStateInterface) => loginState.login.isLoggedIn
// // )

// export const currentUserSelector = createSelector(
//     loginFeatureSelector, 
//     (loginState: AuthStateInterface) => loginState.login.currentUser
// )




