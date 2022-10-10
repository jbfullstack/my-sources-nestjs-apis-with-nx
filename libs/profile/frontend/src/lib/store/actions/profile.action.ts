import { createAction, props } from '@ngrx/store';
import { UpdateUserProfileRequestInterface } from '../../update-user-profile-request.interface';

import { ActionTypes } from '../action-types';
import { CurrentUserInterface } from '@jbhive/types_fe'



export const updateUserProfileAction = createAction(
    ActionTypes.UPDATE_USER_PROFILE,
    props<{ request: UpdateUserProfileRequestInterface}>()
);

export const updateUserProfileSuccessAction = createAction(
    ActionTypes.UPDATE_USER_PROFILE_SUCCESS,
    props<{ user: CurrentUserInterface}>()
);

export const updateUserProfileFailureAction = createAction(
    ActionTypes.UPDATE_USER_PROFILE_FAILURE,
    props<{ errors: string}>()
);
