import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../action-types';

import { CurrentUserInterface, BackendErrorsInterface, UsersListStateInterface } from '@jbhive/types_fe';


export const loadDesactivatedUsersAction = createAction(
    ActionTypes.LOAD_DESACTIVATED
);

export const loadDesactivatedUsersSuccessAction = createAction(
    ActionTypes.LOAD_DESACTIVATED_SUCCESS,
    props<{ desactivatedUsers: CurrentUserInterface[]}>()
);

export const loadDesactivatedUsersFailureAction = createAction(
    ActionTypes.LOAD_DESACTIVATED_FAILURE,
    props<{ errors: string}>()
);

export const loadActivatedUsersAction = createAction(
    ActionTypes.LOAD_ACTIVATED
);

export const loadActivatedUsersSuccessAction = createAction(
    ActionTypes.LOAD_ACTIVATED_SUCCESS,
    props<{ activatedUsers: CurrentUserInterface[]}>()
);

export const loadActivatedUsersFailureAction = createAction(
    ActionTypes.LOAD_ACTIVATED_FAILURE,
    props<{ errors: string}>()
);





export const activateAction = createAction(
    ActionTypes.ACTIVATE,
    props<{ userId: number }>()
);

export const activateSuccessAction = createAction(
    ActionTypes.ACTIVATE_SUCCESS,
    props<{ userId: number}>()
);

export const activateFailureAction = createAction(
    ActionTypes.ACTIVATE_FAILURE,
    props<{ errors: string}>()
);

export const desactivateAction = createAction(
    ActionTypes.DESACTIVATE,
    props<{ userId: number }>()
);

export const desactivateSuccessAction = createAction(
    ActionTypes.DESACTIVATE_SUCCESS,
    props<{ userId: number}>()
);

export const desactivateFailureAction = createAction(
    ActionTypes.DESACTIVATE_FAILURE,
    props<{ errors: string}>()
);

export const updateSearchInputAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT,
    props<{ newValue: string}>()
);

export const updateSearchInputSuccessAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_SUCCESS
);

export const updateSearchInputFailureAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_FAILURE,
    props<{ errors: string}>()
);

export const deleteAction = createAction(
    ActionTypes.DELETE,
    props<{ userId: number }>()
);

export const deleteSuccessAction = createAction(
    ActionTypes.DELETE_SUCCESS,
    props<{ userId: number}>()
);

export const deleteFailureAction = createAction(
    ActionTypes.DELETE_FAILURE,
    props<{ errors: string}>()
);

export const updateRoleAction = createAction(
    ActionTypes.UPDATE_ROLE,
    props<{ userId: number, newRoleId: number }>()
);

export const updateRoleSuccessAction = createAction(
    ActionTypes.UPDATE_ROLE_SUCCESS,
    props<{ userId: number}>()
);

export const updateRoleFailureAction = createAction(
    ActionTypes.UPDATE_ROLE_FAILURE,
    props<{ errors: string}>()
);


updateRoleAction


// export const logoutAction = createAction(
//     ActionTypes.LOGOUT,
// );