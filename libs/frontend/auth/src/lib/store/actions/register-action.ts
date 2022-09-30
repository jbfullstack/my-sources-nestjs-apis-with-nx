import { createAction, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../../types/register-request.interface';
import { ActionTypes } from '../action-types';

import { CurrentUserInterface } from '@jbhive_fe/types';

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<{ request: RegisterRequestInterface }>()
);

export const registerSuccessAction = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<{ currentUser: CurrentUserInterface}>()
);

export const registerFailureAction = createAction(
    ActionTypes.REGISTER_FAILURE
);