import { EnvironmentInjector } from '@angular/core';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
    createReducer,
    on
} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Uptime } from '../models/uptime';
import { loadUptimeFailure, loadUptimeSuccess } from './actions';

export const uptimeStateFeatureKey = 'uptimeState'

export interface UptimeState extends EntityState<Uptime> {
    // uptime: number
    error: any
}


export const adapter: EntityAdapter<Uptime> = createEntityAdapter<Uptime>();

export const initialState = adapter.getInitialState({
    error: undefined
});


export const reducers = createReducer(
    initialState,
    on(loadUptimeSuccess, (state, action) => {
        return adapter.addOne(action.uptime, state);
    }),
    // on(loadUptimeFailure, (state, action) => {
    //   return {
    //     error: action.error
    //   };
    // })
);

export const selectUptimeFeature = createFeatureSelector<UptimeState>(
    uptimeStateFeatureKey
);

export const selectProducts = createSelector(
    selectUptimeFeature,
    adapter.getSelectors().selectAll
);

export const selectError = createSelector(
    selectUptimeFeature,
    (state: UptimeState) => state.error
);
export const metaReducers: MetaReducer<UptimeState>[] = [];
