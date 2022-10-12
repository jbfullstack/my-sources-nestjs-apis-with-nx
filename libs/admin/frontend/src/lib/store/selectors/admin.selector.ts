import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AdminStateInterface, UserInterface } from '@jbhive/types_fe'

export const loginFeatureSelector = createFeatureSelector<AdminStateInterface>('admin')

export const isLoadingSelector = createSelector(
    loginFeatureSelector, 
    (adminState: AdminStateInterface) => adminState.pending
)

export const desactivatedUsersSelector = createSelector(
    loginFeatureSelector, 
    (adminState: AdminStateInterface) => adminState.desactivatedUsersList
)

export const activatedUsersSelector = createSelector(
    loginFeatureSelector, 
    (adminState: AdminStateInterface) => adminState.activatedUsersList
)

export const tagsSelector = createSelector(
    loginFeatureSelector, 
    (adminState: AdminStateInterface) => adminState.tags
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




