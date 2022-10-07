import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AdminStateInterface, CurrentUserInterface } from '@jbhive/types_fe'

export const loginFeatureSelector = createFeatureSelector<AdminStateInterface>('admin')

export const isLoadingSelector = createSelector(
    loginFeatureSelector, 
    (adminState: AdminStateInterface) => adminState.pending
)

export const desactivatedUsersSelector = createSelector(
    loginFeatureSelector, 
    (adminState: AdminStateInterface) => adminState.desactivatedUsersList
)

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




