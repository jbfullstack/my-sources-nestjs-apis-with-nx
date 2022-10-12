import { createAction, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../../types/register-request.interface';
import { ActionTypes } from '../action-types';

import { UserInterface, BackendErrorsInterface, AuthStateInterface } from '@jbhive/types_fe';
import { LoginRequestInterface } from '../../types/login-request.interface';

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{ currentUser: UserInterface}>()
);

export const updateCurentUserAction = createAction(
    ActionTypes.UPDATE_CURRENT_USER,
    props<{ authState: AuthStateInterface}>()
);

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<{ errors: BackendErrorsInterface}>()
);

export const logoutAction = createAction(
    ActionTypes.LOGOUT,
);