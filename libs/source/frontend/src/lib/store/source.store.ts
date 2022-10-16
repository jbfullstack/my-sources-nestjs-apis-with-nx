import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SourceStateInterface, UserInterface, TagInterface, SourceInterface, SourceTypeInterface, Orderby } from "@jbhive/types_fe";
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
    orderbyAsc: false,
    orderbyValue: Orderby.Date,
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

    orderbyAsc$ = this.select(state => state.orderbyAsc)
    orderbyValue$ = this.select(state => state.orderbyValue)


    filteredSources$  = this.select( 
        ({
            sources, searchInput, optionsFilter: options, 
            tagsFilterIds, loggedUserId: id, isAllTagFilterRequired,
            orderbyValue, orderbyAsc 
        }) => sources.filter( 
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
        .sort(
            // -- Sort by owner
            (source1, source2) => {
                return this.sortSourcesBy(source1, source2, orderbyValue, orderbyAsc)
            }
        )
    )

    sortSourcesBy(source1: SourceInterface, source2: SourceInterface, orderbyValue: Orderby, orderbyAsc: boolean): number {     
        console.log('orderbyValue ',orderbyValue) 
        console.log('orderbyAsc ',orderbyAsc) 
        if (orderbyValue == 0){
            console.log('orderbyValue == 0') 
            return this.sortSourcesByAuthor(source1, source2, orderbyAsc)  
        } else  if (orderbyValue == 1){
            console.log('orderbyValue == 1') 
            return this.sortSourcesByType(source1, source2, orderbyAsc) 
        } else  if (orderbyValue == 2){
            console.log('orderbyValue == 2') 
            return this.sortSourcesByDate(source1, source2, orderbyAsc)
        } else {
            return 0
        }
        // switch(orderbyValue){
        //     case Orderby.Author:
        //         return this.sortSourcesByAuthor(source1, source2, orderbyAsc)            
        //     case Orderby.Type:
        //         return this.sortSourcesByType(source1, source2, orderbyAsc)
        //     case Orderby.Date:
        //         return this.sortSourcesByDate(source1, source2, orderbyAsc)
        //     default:
        //         console.log('DEFAULT! ', orderbyValue)
        //         return this.sortSourcesByDate(source1, source2, false)
        // }
            
    }

    sortSourcesByType(source1: SourceInterface, source2: SourceInterface, asc: boolean){
        console.log('sortSourcesByType() ')
        let res = 0
        if (source1.type.id > source2.type.id){
            res = 1
        } else if (source1.type.id < source2.type.id) {
            res = -1
        }
        return (asc) ? res : res * -1
    }

    sortSourcesByAuthor(source1: SourceInterface, source2: SourceInterface, asc: boolean){
        console.log('sortSourcesByAuthor() ')
        let res = 0
        if (source1.owner.pseudo > source2.owner.pseudo){
            res = 1
        } else if (source1.owner.pseudo < source2.owner.pseudo) {
            res = -1
        }
        return (asc) ? res : res * -1
    }

    sortSourcesByDate(source1: SourceInterface, source2: SourceInterface, asc: boolean){
        console.log('sortSourcesByDate() ')
        const date1: Date = new Date(source1.createdAt)
        const date2: Date = new Date(source2.createdAt)
        let res = 0
        if (date1 > date2){
            res = 1
        } else if (date1 < date2) {
            res = -1
        }

        return (asc) ? res : res * -1
    }


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

    loadOrderbyAsc = this.updater( (state, asc: boolean | null) => ({
            ...state,
            orderbyAsc: asc || false
        })  
    )
    
    loadOrderbyValue = this.updater( (state, orderby: Orderby | null) => ({
            ...state,
            orderbyValue: orderby || Orderby.Date
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