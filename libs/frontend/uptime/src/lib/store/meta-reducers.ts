import { Action, ActionReducer, MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'

import * as fromApp from './reducers'

// console log action and class
export function logger(
    reducer: ActionReducer<fromApp.State>,
) : ActionReducer<fromApp.State> {
    return function(state: fromApp.State, action: Action): fromApp.State {
        console.log(`action: ${action}`)
        const newState = reducer(state, action)
        console.log(`newState: ${newState}`)
        return newState
    }
}

export const metaReducers: MetaReducer<fromApp.State>[] = true ? [logger, storeFreeze] : [] // Todo: check if env mode