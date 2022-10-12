import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SourceStateInterface, UserInterface, TagInterface, SourceInterface } from "@jbhive/types_fe";
import { SourceService } from "../services/source.service";

export const initialState: SourceStateInterface = {
    pending: false,
    searchInput: '',
    sources: [],
    tagsFilterIds: [],
    errors: ''
}


@Injectable()
export class SourceStore extends ComponentStore<SourceStateInterface> {

    errors$ = this.select(state => state.errors)
    pending$ = this.select(state => state.pending)
    sources$ = this.select(state => state.sources)
    tagsFilterIds$ = this.select(state => state.tagsFilterIds)
    searchInput$ = this.select(state => state.searchInput)

    filteredActivatedUsers$ = this.select( 
        ({sources, searchInput: searchInput}) => sources.filter( 
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


    constructor(private sourceService : SourceService){
        super(initialState)
    }

}