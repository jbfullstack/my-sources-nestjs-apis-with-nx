import { createAction, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { ActionTypes } from '../action-types';

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{ email: string, password: string}>()
);