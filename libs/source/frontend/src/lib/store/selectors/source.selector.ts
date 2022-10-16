import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SourceStateInterface } from '@jbhive/types_fe'

export const sourceFeatureSelector = createFeatureSelector<SourceStateInterface>('source')

export const isLoadingSelector = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.pending
)

export const sourceSelector = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.sources
)

export const typeSelector = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.types
)

export const tagSelector = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.tags
)

export const searchInputSelector = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.searchInput
)

export const tagsFilterIdsSelector = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.tagsFilterIds
)

export const isAllTagFilterRequiredSelector = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.isAllTagFilterRequired
)

export const orderbyAsc = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.orderbyAsc
)

export const orderbyValue = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.orderbyValue
)

export const errorsSelector = createSelector(
    sourceFeatureSelector, 
    (sourceState: SourceStateInterface) => sourceState.errors
)



