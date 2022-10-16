export enum ActionTypes {
    LOAD_SOURCES = '[Source] Load sources',
    LOAD_SOURCES_SUCCESS = '[Source] Load sources success',
    LOAD_SOURCES_FAILURE = '[Source] Load sources failure',

    LOAD_TYPES = '[Source] Load types',
    LOAD_TYPES_SUCCESS = '[Source] Load types success',
    LOAD_TYPES_FAILURE = '[Source] Load types failure',

    LOAD_TAGS = '[Source] Load tags',
    LOAD_TAGS_SUCCESS = '[Source] Load tags success',
    LOAD_TAGS_FAILURE = '[Source] Load tags failure',    

    CREATE_SOURCE = '[Source] Create source',
    CREATE_SOURCE_SUCCESS = '[Source] Create source success',
    CREATE_SOURCE_FAILURE = '[Source] Create source failure',

    DELETE_SOURCE = '[Source] Delete source',
    DELETE_SOURCE_SUCCESS = '[Source] Delete source success',
    DELETE_SOURCE_FAILURE = '[Source] Delete source failure',

    DELETE_SOURCE_OWNED = '[Source] Delete source owned',
    DELETE_SOURCE_OWNED_SUCCESS = '[Source] Delete source success owned',
    DELETE_SOURCE_OWNED_FAILURE = '[Source] Delete source failure owned',

    UPDATE_SOURCE = '[Source] Update source',
    UPDATE_SOURCE_SUCCESS = '[Source] Update source success',
    UPDATE_SOURCE_FAILURE = '[Source] Update source failure',

    UPDATE_SOURCE_OWNED = '[Source] Update source owned',
    UPDATE_SOURCE_OWNED_SUCCESS = '[Source] Update source success owned',
    UPDATE_SOURCE_OWNED_FAILURE = '[Source] Update source failure owned',

    UPDATE_SEARCH_INPUT_USER = '[Source] Update search input user',
    UPDATE_SEARCH_INPUT_USER_SUCCESS = '[Source] search input user success',
    UPDATE_SEARCH_INPUT_USER_FAILURE = '[Source] search input user failure',

    ADD_TAG_FILTER = '[Source] Add tag filter',
    ADD_TAG_FILTER_SUCCESS = '[Source] Add tag filter success',
    ADD_TAG_FILTER_FAILURE = '[Source] Add tag filter failure',

    REMOVE_TAG_FILTER = '[Source] Remove tag filter',
    REMOVE_TAG_FILTER_SUCCESS = '[Source] Remove tag filter success',
    REMOVE_TAG_FILTER_FAILURE = '[Source] Remove tag filter failure',

}