export enum ActionTypes {
    LOAD_SOURCES = '[Source] Load sources',
    LOAD_SOURCES_SUCCESS = '[Source] Load sources success',
    LOAD_SOURCES_FAILURE = '[Source] Load sources failure',

    CREATE_SOURCE = '[Source] Create source',
    CREATE_SOURCE_SUCCESS = '[Source] Create source success',
    CREATE_SOURCE_FAILURE = '[Source] Create source failure',

    DELETE_SOURCE = '[Source] Delete source',
    DELETE_SOURCE_SUCCESS = '[Source] Delete source success',
    DELETE_SOURCE_FAILURE = '[Source] Delete source failure',

    UPDATE_SOURCE = '[Source] Update role',
    UPDATE_SOURCE_SUCCESS = '[Source] Update role success',
    UPDATE_SOURCE_FAILURE = '[Source] Update role failure',

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