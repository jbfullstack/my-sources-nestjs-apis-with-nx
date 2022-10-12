import { createAction, props } from '@ngrx/store';
import { UpdateUserProfileRequestInterface } from '../../update-user-profile-request.interface';

import { ActionTypes } from '../action-types';
import { UserInterface } from '@jbhive/types_fe'



export const updateUserProfileAction = createAction(
    ActionTypes.UPDATE_USER_PROFILE,
    props<{ pseudo: string, nickname: string, email: string, password: string}>()
);

export const updateUserProfileSuccessAction = createAction(
    ActionTypes.UPDATE_USER_PROFILE_SUCCESS,
    props<{ user: UserInterface}>()
);

export const updateUserProfileFailureAction = createAction(
    ActionTypes.UPDATE_USER_PROFILE_FAILURE,
    props<{ errors: string}>()
);
