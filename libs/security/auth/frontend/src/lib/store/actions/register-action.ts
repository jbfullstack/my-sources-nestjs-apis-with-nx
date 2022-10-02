import { createAction, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../../types/register-request.interface';
import { ActionTypes } from '../action-types';

import { BackendErrorsInterface, CurrentUserInterface } from '@jbhive/types_fe';

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<{ request: RegisterRequestInterface }>()
);

export const registerSuccessAction = createAction(
    ActionTypes.REGISTER_SUCCESS,
    props<{ currentUser: CurrentUserInterface}>()
);

export const registerFailureAction = createAction(
    ActionTypes.REGISTER_FAILURE,
    props<{ errors: BackendErrorsInterface}>()
);