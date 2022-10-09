export enum ActionTypes {
    LOAD_DESACTIVATED = '[Admin] Load desactivated users',
    LOAD_DESACTIVATED_SUCCESS = '[Admin] Load desactivated users success',
    LOAD_DESACTIVATED_FAILURE = '[Admin] Load desactivated users failure',

    LOAD_ACTIVATED = '[Admin] Load activated users',
    LOAD_ACTIVATED_SUCCESS = '[Admin] Load activated users success',
    LOAD_ACTIVATED_FAILURE = '[Admin] Load activated users failure',

    LOAD_TAGS = '[Admin] Load tags',
    LOAD_TAGS_SUCCESS = '[Admin] Load tags success',
    LOAD_TAGS_FAILURE = '[Admin] Load tags failure',
    

    ACTIVATE = '[Admin] Activate',
    ACTIVATE_SUCCESS = '[Admin] Activate success',
    ACTIVATE_FAILURE = '[Admin] Activate failure',

    DESACTIVATE = '[Admin] Desactivate',
    DESACTIVATE_SUCCESS = '[Admin] Desactivate success',
    DESACTIVATE_FAILURE = '[Admin] Desactivate failure',

    UPDATE_SEARCH_INPUT_USER = '[Admin] Update search input user',
    UPDATE_SEARCH_INPUT_USER_SUCCESS = '[Admin] search input user success',
    UPDATE_SEARCH_INPUT_USER_FAILURE = '[Admin] search input user failure',

    UPDATE_SEARCH_INPUT_TAG = '[Admin] Update search input tag',
    UPDATE_SEARCH_INPUT_TAG_SUCCESS = '[Admin] search input tag success',
    UPDATE_SEARCH_INPUT_TAG_FAILURE = '[Admin] search input tag failure',

    UPDATE_ROLE = '[Admin] Update role',
    UPDATE_ROLE_SUCCESS = '[Admin] Update role success',
    UPDATE_ROLE_FAILURE = '[Admin] Update role failure',

    SEARCH_USER = '[Admin] Search',
    SEARCH_USER_SUCCESS = '[Admin] Search success',
    SEARCH_USER_FAILURE = '[Admin] Search failure',

   

    RESET_SEARCH = '[Admin] Reset search',

    DELETE = '[Admin] Delete',
    DELETE_SUCCESS = '[Admin] Delete success',
    DELETE_FAILURE = '[Admin] Delete failure',

    HIDE = '[Admin] Hide',
    HIDE_SUCCESS = '[Admin] Hide success',
    HIDE_FAILURE = '[Admin] Hide failure',
    
    REGENERATE_PASSWORD = '[Admin] Regenerate password',
    REGENERATE_PASSWORD_SUCCESS = '[Admin] Regenerate password success',
    REGENERATE_PASSWORD_FAILURE = '[Admin] Regenerate password failure',

    UPDATE_TAG = '[Admin] Update tag',
    UPDATE_TAG_SUCCESS = '[Admin] Update tag success',
    UPDATE_TAG_FAILURE = '[Admin] Update tag failure',

    CREATE_TAG = '[Admin] Create tag',
    CREATE_TAG_SUCCESS = '[Admin] Create tag success',
    CREATE_TAG_FAILURE = '[Admin] Create tag failure',

    DELETE_TAG = '[Admin] Delete tag',
    DELETE_TAG_SUCCESS = '[Admin] Delete tag success',
    DELETE_TAG_FAILURE = '[Admin] Delete tag failure',
}