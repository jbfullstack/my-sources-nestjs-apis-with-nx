import { Action } from "@ngrx/store";
import { uptime } from "process";
import { filter } from "rxjs";
import { UptimeFilter } from "../models/uptime-filter.model";
import { Uptime } from "../models/uptime.model";
import * as fromUptime from './actions'

export interface State {
    uptime: Uptime
    filter: UptimeFilter
}

const initialState: State = {
    uptime: { time: 0 },
    filter: 'SECONDS'
}

export function reducer(
    state: State = initialState,
    action: fromUptime.UptimeActionType
): State {
    // console.log(`reducer> action: ${action}`)
    switch (action.type) {
        case fromUptime.LOAD_UPTIME: {
            return {
                ...state,
                uptime: { time: action.uptime },
                filter: state.filter
            }
        }
        case fromUptime.CHANGE_FILTER_UPTIME: {
            return {
                ...state,
                filter: action.filter
            }
        }
    }


}
