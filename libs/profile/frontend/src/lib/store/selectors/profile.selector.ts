import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AdminStateInterface, ProfileUserStateInterface, } from '@jbhive/types_fe'
import { ProfileStateInterface } from '../../profile-state.interface'

export const loginFeatureSelector = createFeatureSelector<ProfileUserStateInterface>('profile')

export const isPendingSelector = createSelector(
    loginFeatureSelector, 
    (profileState: ProfileUserStateInterface) => profileState.pending
)

export const userProfileSelector = createSelector(
    loginFeatureSelector, 
    (profileState: ProfileUserStateInterface) => profileState.user
)

export const emailSelector = createSelector(
    loginFeatureSelector, 
    (profileState: ProfileUserStateInterface) => profileState.user.email
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




