import { createReducer, on, State, Action } from "@ngrx/store";
import { SourceStateInterface, UserInterface } from "@jbhive/types_fe";
import { initialState } from "../source.store";
import { addTagAction, addTagFailureAction, addTagSuccessAction, createSourceAction, createSourceFailureAction, createSourceSuccessAction, deleteSourceAction, deleteSourceFailureAction, deleteSourceSuccessAction, loadSourcesAction, loadSourcesFailureAction, loadSourcesSuccessAction, loadTagsAction, loadTagsFailureAction, loadTagsSuccessAction, loadTypesAction, loadTypesFailureAction, loadTypesSuccessAction, removeTagAction, removeTagFailureAction, removeTagSuccessAction, updateSearchInputAction, updateSearchInputFailureAction, updateSearchInputSuccessAction, updateSourceAction, updateSourceFailureAction, updateSourceSuccessAction } from "../actions/source.action";
import { logoutAction } from "@jbhive/auth_fe";



const sourceReducer = createReducer(
    initialState, 
    /** ---- LOAD SOURCE ---- */
    on (
        loadSourcesAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on (
        loadSourcesSuccessAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            sources: action.sources
        })
    ),
    on (
        loadSourcesFailureAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),

    /** ---- LOAD SOURCE TYPES ---- */
    on (
        loadTypesAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on (
        loadTypesSuccessAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            types: action.types
        })
    ),
    on (
        loadTypesFailureAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),

    /** ---- LOAD TAG ---- */
    on (
        loadTagsAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on (
        loadTagsSuccessAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            tags: action.tags
        })
    ),
    on (
        loadTagsFailureAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),
    
    /** ---- CREATE SOURCE ---- */
    on (
        createSourceAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on (
        createSourceSuccessAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            sources: [...state.sources, action.source]
        })
    ),
    on (
        createSourceFailureAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),

    /** ---- DELETE SOURCE ---- */
    on (
        deleteSourceAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on (
        deleteSourceSuccessAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            sources: state.sources.filter( source => source.id !== action.id),          
        })
    ),
    on (
        deleteSourceFailureAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),

    /** ---- UPDATE SOURCE ---- */
    on (
        updateSourceAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on (
        updateSourceSuccessAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            sources:[...state.sources.filter( source => source.id !== action.source.id), action.source]            
        })
    ),
    on (
        updateSourceFailureAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),

    /** ---- UPDATE SEARCH INPUT ---- */
    on (
        updateSearchInputAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            searchInput: action.search
        })
    ),


    /** ---- ADD TAG ---- */
    on (
        addTagAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on (
        addTagSuccessAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            tagsFilterIds:[...state.tagsFilterIds, action.id]            
        })
    ),
    on (
        addTagFailureAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),

    /** ---- REMOVE TAG ---- */
    on (
        removeTagAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: true
        })
    ),
    on (
        removeTagSuccessAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            tagsFilterIds: state.tagsFilterIds.filter( tagId => tagId !== action.id)           
        })
    ),
    on (
        removeTagFailureAction,
        (state, action): SourceStateInterface => 
        ({
            ...state,
            pending: false,
            errors: action.errors
        })
    ),

    /** ---- LOGOUT ---- */
    on(
        logoutAction, 
        (state, action): SourceStateInterface => 
        ({
            ...state,
            errors: '',
            pending: false,
            // searchInput: '',
            sources: [],
            tags: [],
            types: [],
            tagsFilterIds: [],
            loggedUserId: 0,
            searchInput:'wow'
        })
    ),

)

export function reducers(state: SourceStateInterface, action: Action){
    return sourceReducer(state, action)
}