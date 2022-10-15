import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SourceStateInterface, UserInterface, TagInterface, SourceInterface, SourceTypeInterface } from "@jbhive/types_fe";
import { SourceService } from "../services/source.service";

export const initialState: SourceStateInterface = {
    pending: false,
    loggedUserId: 0,
    searchInput: '',
    sources: [],
    types: [],
    tags: [],
    tagsFilterIds: [],
    isAllTagFilterRequired: false,
    optionsFilter: {
        showOwned: true,
        showOwnedPrivate: false,
        showUnowned: false
    },
    errors: ''
}


@Injectable()
export class SourceStore extends ComponentStore<SourceStateInterface> {

    errors$ = this.select(state => state.errors)
    pending$ = this.select(state => state.pending)
    loggedUserId$  = this.select(state => state.loggedUserId)
    sources$ = this.select(state => state.sources)
    type$ = this.select(state => state.types)
    tags$ = this.select(state => state.tags)
    tagsFilterIds$ = this.select(state => state.tagsFilterIds)
    isAllTagFilterRequired$ = this.select(state => state.isAllTagFilterRequired)
    searchInput$ = this.select(state => state.searchInput)
    optionsFilter$ = this.select(state => state.optionsFilter)
    showOwned$ = this.select(state => state.optionsFilter.showOwned)
    showOwnedPrivate$ = this.select(state => state.optionsFilter.showOwnedPrivate)
    showUnowned$ = this.select(state => state.optionsFilter.showUnowned)


    filteredSources$  = this.select( 
        ({sources, searchInput, optionsFilter: options, tagsFilterIds, loggedUserId: id, isAllTagFilterRequired }) => sources.filter( 
            (source) => (options.showOwned && options.showUnowned)  ? 
                            (options.showOwnedPrivate)  ? source // all options
                                                        : ( source.owner.id === id && source.public === true) || ( source.owner.id !== id)
                        : (options.showOwned)   ? options.showOwnedPrivate  ?  source.owner.id === id 
                                                                            :  ( source.owner.id === id && source.public === true)
                        : (options.showUnowned) ? source.owner.id !== id  
                                                : []
        ).filter(
            // apply filter by search input
            (source) =>     source.title.toLowerCase().includes(searchInput.toLowerCase()) 
                        ||  source.description.toLowerCase().includes(searchInput.toLowerCase())
                        ||  source.content.toLowerCase().includes(searchInput.toLowerCase())
        )
        .filter(
            // apply filter by tag
            (source) => ( isAllTagFilterRequired )  ? this.sourceContainsAllTagsOf(source, tagsFilterIds) 
                                                    : this.sourceContainsAtLeastOneTagOf(source, tagsFilterIds)
        )
    )


    sourceContainsAtLeastOneTagOf(source: SourceInterface, tagsFilter: number[]) : boolean {   
        return (tagsFilter.length === 0)? true : source.tags.some( tag => tagsFilter.includes(tag.id))        
    }

    sourceContainsAllTagsOf(source: SourceInterface, tagsFilter: number[])  {   
        let sourceTagIds : number[] = []
        for(var tag of source.tags){
            sourceTagIds.push(tag.id)
        }

        if (tagsFilter.length === 0){
            return true
        } else {
            return tagsFilter.every( id => sourceTagIds.includes(id))
        }
    }

    loadSearchInput = this.updater( (state, search: string | null) => ({
            ...state,
            searchInput: search || ''
        })  
    )

    loadSources = this.updater( (state, sources: SourceInterface[] | null) => ({
            ...state,
            sources: sources || []
        })  
    )  

    loadTypes = this.updater( (state, types: SourceTypeInterface[] | null) => ({
            ...state,
            types: types || []
        })  
    )

    loadTags = this.updater( (state, tags: TagInterface[] | null) => ({
            ...state,
            tags: tags || []
        })  
    )  

    loadTagsFilterIds = this.updater( (state, ids: number[] | null) => ({
            ...state,
            tagsFilterIds: ids || []
        })  
    )

    loadIsAllTagFilterRequired = this.updater( (state, allTagRequired: boolean | null) => ({
            ...state,
            isAllTagFilterRequired: allTagRequired || false
        })  
    )


    // addTagsFilterIds  = this.updater( (state, id: number) => ({
    //         ...state,
    //         tagsFilterIds: [...state.tagsFilterIds, id]
    //     })  
    // )

    // removeTagsFilterIds  = this.updater( (state, id: number) => ({
    //     ...state,
    //     tagsFilterIds: state.tagsFilterIds.filter(tagId => tagId !== id)
    // })  


    loadLoggedUserId = this.updater( (state, id: number | null) => ({
        ...state,
        loggedUserId: id || 0
        })  
    )


    constructor(private sourceService : SourceService){
        super(initialState)
    }

}