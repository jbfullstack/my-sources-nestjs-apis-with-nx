import { Observable, Subscription } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'
import { loadSourcesAction } from '../../store/actions/source.action'
import { sourceSelector } from '../../store/selectors/source.selector'


@Component({
    selector: 'ms-source-page',
    templateUrl: './source-page.component.html',
    styleUrls: ['./source-page.component.scss'],
    providers: [SourceStore]
})
export class SourcePageComponent implements OnInit{

    errors$ = this.sourceStore.errors$
    pending$ = this.sourceStore.pending$
    sources$ = this.sourceStore.sources$
    tagsFilterIds$ = this.sourceStore.tagsFilterIds$
    searchInput$ = this.sourceStore.searchInput$

    filteredActivatedUsers$ = this.sourceStore.filteredActivatedUsers$


    searchSourceInput: string = ''

    constructor(private formBuilder : FormBuilder, private store: Store, private sourceStore: SourceStore) { }

    ngOnInit(): void {
        this.initializeValues()
    }

    initializeValues(): void {

        this.store.dispatch(loadSourcesAction())

        this.store.pipe(select(sourceSelector)).subscribe( {
            next: (sources) => {
                if (sources) {
                    console.log('sources: ', sources)
                    this.sourceStore.loadSources(sources)
                }             
            }
        })
        
    }

    searchInputChange(value : string){
        
    }
}