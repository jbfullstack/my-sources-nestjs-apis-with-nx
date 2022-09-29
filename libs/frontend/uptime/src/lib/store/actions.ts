import { createAction, props, Action } from '@ngrx/store';
import { UptimeFilter } from "../models/uptime-filter.model";
// import { Uptime } from '../models/uptime';

// export const loadUptime = createAction(
//     '[UPTIME COMPONENT] Load uptime'
// )

// export const loadUptimeSuccess = createAction(
//     '[UPTIME COMPONENT] Load uptime success',
//     props<{ uptime: Uptime }>()
// )

// export const loadUptimeFailure = createAction(
//     '[UPTIME COMPONENT] Load uptime failure',
//     props<{ error: any }>()
// )

export const LOAD_UPTIME = '[UPTIME COMPONENT] Load uptime'
export const CHANGE_FILTER_UPTIME = '[UPTIME COMPONENT] Change filter'

export class LoadUptimeAction implements Action {
    readonly type = LOAD_UPTIME
    constructor(public uptime: number) { }
}

export class ChangeFilterAction implements Action {
    readonly type = CHANGE_FILTER_UPTIME
    constructor(public filter: UptimeFilter) { }
}

export type UptimeActionType = 
    | LoadUptimeAction
    | ChangeFilterAction