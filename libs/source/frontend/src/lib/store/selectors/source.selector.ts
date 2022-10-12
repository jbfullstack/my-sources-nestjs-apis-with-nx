import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SourceStateInterface } from '@jbhive/types_fe'

export const sourceFeatureSelector = createFeatureSelector<SourceStateInterface>('source')

export const isLoadingSelector = createSelector(
    sourceFeatureSelector, 
    (adminState: SourceStateInterface) => adminState.pending
)

export const sourceSelector = createSelector(
    sourceFeatureSelector, 
    (adminState: SourceStateInterface) => adminState.sources
)

export const searchInputSelector = createSelector(
    sourceFeatureSelector, 
    (adminState: SourceStateInterface) => adminState.searchInput
)

export const tagsFilterIdsSelector = createSelector(
    sourceFeatureSelector, 
    (adminState: SourceStateInterface) => adminState.tagsFilterIds
)

export const errorsSelector = createSelector(
    sourceFeatureSelector, 
    (adminState: SourceStateInterface) => adminState.errors
)



