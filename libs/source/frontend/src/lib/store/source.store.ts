import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SourceStateInterface, UserInterface, TagInterface, SourceInterface } from "@jbhive/types_fe";
import { SourceService } from "../services/source.service";

export const initialState: SourceStateInterface = {
    pending: false,
    loggedUserId: 0,
    searchInput: '',
    sources: [],
    tagsFilterIds: [],
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
    tagsFilterIds$ = this.select(state => state.tagsFilterIds)
    searchInput$ = this.select(state => state.searchInput)
    optionsFilter$ = this.select(state => state.optionsFilter)
    showOwned$ = this.select(state => state.optionsFilter.showOwned)
    showOwnedPrivate$ = this.select(state => state.optionsFilter.showOwnedPrivate)
    showUnowned$ = this.select(state => state.optionsFilter.showUnowned)

    // filteredSearchInput$ = this.select( 
    //     ({sources, searchInput: searchInput}) => sources.filter( 
    //         (source) => source.title.toLowerCase().includes(searchInput.toLowerCase()) || source.description.toLowerCase().includes(searchInput.toLowerCase())
    //     )
    // )

    filteredSources$  = this.select( 
        ({sources, searchInput: searchInput, optionsFilter: options, loggedUserId: id }) => sources.filter( 
            (source) => (options.showOwned && options.showUnowned)  ? 
                            (options.showOwnedPrivate)  ? source // all options
                                                        : ( source.owner.id === id && source.public === true) || ( source.owner.id !== id)
                        : (options.showOwned)   ? options.showOwnedPrivate  ?  source.owner.id === id 
                                                                            :  ( source.owner.id === id && source.public === true)
                        : (options.showUnowned) ? source.owner.id !== id  
                                                : []
        ).filter(
            // apply filter by search input
            (source) => source.title.toLowerCase().includes(searchInput.toLowerCase()) || source.description.toLowerCase().includes(searchInput.toLowerCase())
        )
    )

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

    loadTagsFilterIds = this.updater( (state, ids: number[] | null) => ({
            ...state,
            tagsFilterIds: ids || []
        })  
    )

    loadLoggedUserId = this.updater( (state, id: number | null) => ({
        ...state,
        loggedUserId: id || 0
    })  
)


    constructor(private sourceService : SourceService){
        super(initialState)
    }

}