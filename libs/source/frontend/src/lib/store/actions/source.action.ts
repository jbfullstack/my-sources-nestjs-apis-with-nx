import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../action-types';
import { CreateSourceRequestInterface, SourceInterface, SourceTypeInterface, TagInterface, UpdateSourceRequestInterface, UserInterface } from '@jbhive/types_fe'



export const loadSourcesAction = createAction(
    ActionTypes.LOAD_SOURCES
);

export const loadSourcesSuccessAction = createAction(
    ActionTypes.LOAD_SOURCES_SUCCESS,
    props<{ sources: SourceInterface[]}>()
);

export const loadSourcesFailureAction = createAction(
    ActionTypes.LOAD_SOURCES_FAILURE,
    props<{ errors: string}>()
);

export const loadTypesAction = createAction(
    ActionTypes.LOAD_TYPES
);

export const loadTypesSuccessAction = createAction(
    ActionTypes.LOAD_TYPES_SUCCESS,
    props<{ types: SourceTypeInterface[]}>()
);

export const loadTypesFailureAction = createAction(
    ActionTypes.LOAD_TYPES_FAILURE,
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

export const updateSearchInputAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_USER,
    props<{ search: string}>()
);

export const updateSearchInputSuccessAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_USER_SUCCESS
);

export const updateSearchInputFailureAction = createAction(
    ActionTypes.UPDATE_SEARCH_INPUT_USER_FAILURE,
    props<{ errors: string}>()
);

export const addTagAction = createAction(
    ActionTypes.ADD_TAG_FILTER,
    props<{ id: number}>()
);

export const addTagSuccessAction = createAction(
    ActionTypes.ADD_TAG_FILTER_SUCCESS,
    props<{ id: number}>()
);

export const addTagFailureAction = createAction(
    ActionTypes.REMOVE_TAG_FILTER_FAILURE,
    props<{ errors: string}>()
);

export const removeTagAction = createAction(
    ActionTypes.REMOVE_TAG_FILTER,
    props<{ id: number}>()
);

export const removeTagSuccessAction = createAction(
    ActionTypes.REMOVE_TAG_FILTER_SUCCESS,
    props<{ id: number}>()
);

export const removeTagFailureAction = createAction(
    ActionTypes.REMOVE_TAG_FILTER_FAILURE,
    props<{ errors: string}>()
);

export const updateSourceAction = createAction(
    ActionTypes.UPDATE_SOURCE,
    props<{ sourceId: number, input: UpdateSourceRequestInterface}>()
);

export const updateSourceSuccessAction = createAction(
    ActionTypes.UPDATE_SOURCE_SUCCESS,
    props<{ source: SourceInterface}>()
);

export const updateSourceFailureAction = createAction(
    ActionTypes.UPDATE_SOURCE_FAILURE,
    props<{ errors: string}>()
);

export const deleteSourceAction = createAction(
    ActionTypes.DELETE_SOURCE,
    props<{ id: number}>()
);

export const deleteSourceSuccessAction = createAction(
    ActionTypes.DELETE_SOURCE_SUCCESS,
    props<{ id: number}>()
);

export const deleteSourceFailureAction = createAction(
    ActionTypes.DELETE_SOURCE_FAILURE,
    props<{ errors: string}>()
);

export const createSourceAction = createAction(
    ActionTypes.CREATE_SOURCE,
    props<{ request: CreateSourceRequestInterface}>()
);

export const createSourceSuccessAction = createAction(
    ActionTypes.CREATE_SOURCE_SUCCESS,
    props<{ source: SourceInterface}>()
);

export const createSourceFailureAction = createAction(
    ActionTypes.CREATE_SOURCE_FAILURE,
    props<{ errors: string}>()
);



