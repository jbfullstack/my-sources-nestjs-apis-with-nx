import { createAction, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../../types/register-request.interface';
import { ActionTypes } from '../action-types';

import { CurrentUserInterface, BackendErrorsInterface } from '@jbhive_fe/types';
import { LoginRequestInterface } from '../../types/login-request.interface';

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{ currentUser: CurrentUserInterface}>()
);

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<{ errors: BackendErrorsInterface}>()
);