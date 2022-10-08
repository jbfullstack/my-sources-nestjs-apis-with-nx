export enum ActionTypes {
    LOAD_DESACTIVATED = '[Admin] Load desactivated users',
    LOAD_DESACTIVATED_SUCCESS = '[Admin] Load desactivated users success',
    LOAD_DESACTIVATED_FAILURE = '[Admin] Load desactivated users failure',

    LOAD_ACTIVATED = '[Admin] Load activated users',
    LOAD_ACTIVATED_SUCCESS = '[Admin] Load activated users success',
    LOAD_ACTIVATED_FAILURE = '[Admin] Load activated users failure',

    ACTIVATE = '[Admin] Activate',
    ACTIVATE_SUCCESS = '[Admin] Activate success',
    ACTIVATE_FAILURE = '[Admin] Activate failure',

    DESACTIVATE = '[Admin] Desactivate',
    DESACTIVATE_SUCCESS = '[Admin] Desactivate success',
    DESACTIVATE_FAILURE = '[Admin] Desactivate failure',

    SEARCH = '[Admin] Search',
    SEARCH_SUCCESS = '[Admin] Search success',
    SEARCH_FAILURE = '[Admin] Search failure',

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
}