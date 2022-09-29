import { createAction, props } from '@ngrx/store';
import { RegisterUserInterface } from '../types/register-user.interface';
import { ActionTypes } from './action-types';

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<{ request: RegisterUserInterface }>()
);

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{ email: string, password: string}>()
);