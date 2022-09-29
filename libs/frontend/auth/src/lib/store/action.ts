import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types';

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<{ pseudo: string, email: string, password: string}>()
);

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{ email: string, password: string}>()
);