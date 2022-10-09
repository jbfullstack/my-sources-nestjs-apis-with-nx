import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../action-types';

import { CurrentUserInterface, BackendErrorsInterface, UsersListStateInterface, TagInterface } from '@jbhive/types_fe';


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

export const loadTagsAction = createAction(
    ActionTypes.LOAD_TAGS
);

export const loadTagsSuccessAction = createAction(
    ActionTypes.LOAD_TAGS_SUCCESS,
    props<{ tags: TagInterface[]}>()
);

export const loadTagsFailureAction = createAction(
    ActionTypes.LOAD_TAGS_FAILURE,
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

export const updateSearchUserInputAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_USER,
    props<{ newValue: string}>()
);

export const updateSearchUserInputSuccessAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_USER_SUCCESS
);

export const updateSearchUserInputFailureAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_USER_FAILURE,
    props<{ errors: string}>()
);

export const updateSearchTagInputAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_TAG,
    props<{ newValue: string}>()
);

export const updateSearchTagInputSuccessAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_TAG_SUCCESS
);

export const updateSearchTagInputFailureAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_TAG_FAILURE,
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


export const generatePasswordAction = createAction(
    ActionTypes.REGENERATE_PASSWORD,
    props<{ userId: number, password: string }>()
);

export const generatePasswordSuccessAction = createAction(
    ActionTypes.REGENERATE_PASSWORD_SUCCESS
);

export const generatePasswordFailureAction = createAction(
    ActionTypes.REGENERATE_PASSWORD_FAILURE,
    props<{ errors: string}>()
);

export const hideAction = createAction(
    ActionTypes.HIDE,
    props<{ userId: number }>()
);

export const hideSuccessAction = createAction(
    ActionTypes.HIDE_SUCCESS,
    props<{ userId: number }>()
);

export const hideFailureAction = createAction(
    ActionTypes.HIDE_FAILURE,
    props<{ errors: string}>()
);


export const updateTagAction = createAction(
    ActionTypes.UPDATE_TAG,
    props<{ id: number, title: string, description: string }>()
);

export const updateTagSuccessAction = createAction(
    ActionTypes.UPDATE_TAG_SUCCESS,
    props<{ tagId: number }>()
);

export const updateTagFailureAction = createAction(
    ActionTypes.UPDATE_TAG_FAILURE,
    props<{ errors: string}>()
);


// export const logoutAction = createAction(
//     ActionTypes.LOGOUT,
// );