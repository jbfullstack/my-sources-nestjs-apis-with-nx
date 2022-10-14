import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SourceStateInterface, UserInterface, TagInterface, SourceInterface } from "@jbhive/types_fe";
import { SourceService } from "../services/source.service";

export const initialState: SourceStateInterface = {
    pending: false,
    loggedUserId: 0,
    searchInput: '',
    sources: [],
    tags: [],
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
    tags$ = this.select(state => state.tags)
    tagsFilterIds$ = this.select(state => state.tagsFilterIds)
    searchInput$ = this.select(state => state.searchInput)
    optionsFilter$ = this.select(state => state.optionsFilter)
    showOwned$ = this.select(state => state.optionsFilter.showOwned)
    showOwnedPrivate$ = this.select(state => state.optionsFilter.showOwnedPrivate)
    showUnowned$ = this.select(state => state.optionsFilter.showUnowned)


    filteredSources$  = this.select( 
        ({sources, searchInput, optionsFilter: options, tagsFilterIds, loggedUserId: id }) => sources.filter( 
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
        .filter(
            // apply filter by tag
            (source) => (tagsFilterIds.length === 0)? source : source.tags.some( tag => tagsFilterIds.includes(tag.id))
        )
    )


    sourceContainsAtLeastOneTagOf(source: SourceInterface, tagsFilter: number[]): boolean {   
        if (tagsFilter.length === 0) {
            console.log('tagsFilter empty -> return')
            return true
        } else {
            console.log('tagsFilter -> ', tagsFilter)
            const included = source.tags.some( tag => tagsFilter.includes(+tag.id))
            console.log('tada: ', included)
            return included
            // console.log('sourceContainsAtLeastOneTagOf: source.tags', source.tags)
            // console.log('sourceContainsAtLeastOneTagOf: tagsFilter',tagsFilter)
            // for (var tag of source.tags) {                
            //     console.log('current source tag id: ', tag.id)
            //     for (var tagIdFilter of tagsFilter) {
            //         console.log('current tag filter id: ', tagIdFilter)

            //         console.log(`${+tag.id} === ${tagIdFilter}`)
            //         if (+tag.id === tagIdFilter){
            //             console.log(`true`)
            //             return true
            //         }
            //     }
            // }
    
            // return false
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