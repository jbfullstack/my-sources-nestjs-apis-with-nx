import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SourceStateInterface, UserInterface, TagInterface } from "@jbhive/types_fe";

export const initialState: SourceStateInterface = {
    pending: false,
    searchInput: '',
    sources: [],
    tagsFilter: []
}


@Injectable()
export class SourceStore extends ComponentStore<SourceStateInterface> {    

}