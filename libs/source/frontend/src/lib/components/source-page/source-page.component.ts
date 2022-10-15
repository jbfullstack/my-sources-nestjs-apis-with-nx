import { Observable, Subscription } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'
import { loadSourcesAction, loadTagsAction } from '../../store/actions/source.action'
import { isAllTagFilterRequiredSelector, sourceSelector, tagSelector, tagsFilterIdsSelector } from '../../store/selectors/source.selector'
import { currentUserSelector } from '@jbhive/auth_fe'


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
    tags$ = this.sourceStore.tags$
    tagsFilterIds$ = this.sourceStore.tagsFilterIds$
    searchInput$ = this.sourceStore.searchInput$

    filteredSources$ = this.sourceStore.filteredSources$
    

    newSourceTitle: string = ''
    newSourceUrl: string = ''
    newSourceContent: string = ''
    newSourceDescription: string = ''
    newSourcePublic: boolean = true

    searchSourceInput: string = ''

    // search_options: string = 'owned';
    search_options_array: string[] = ['owned']
    isAllTagsRequired: boolean = false

    constructor(private formBuilder : FormBuilder, private store: Store, private sourceStore: SourceStore) { }

    ngOnInit(): void {
        this.initializeValues()
    }

    initializeValues(): void {

        this.store.dispatch(loadSourcesAction())
        this.store.dispatch(loadTagsAction())

        this.store.pipe(select(sourceSelector)).subscribe( {
            next: (sources) => {
                if (sources) {
                    console.log('sources: ', sources)
                    this.sourceStore.loadSources(sources)
                }             
            }
        })

        this.store.pipe(select(tagSelector)).subscribe( {
            next: (tags) => {
                if (tags) {
                    console.log('loaded tags: ', tags)
                    this.sourceStore.loadTags(tags)
                }             
            }
        })

        this.store.pipe(select(currentUserSelector)).subscribe( {
            next: (user) => {
                if (user) {
                    console.log('user.id: ', user.id)
                    this.sourceStore.loadLoggedUserId(user.id)
                }             
            }
        })

        this.store.pipe(select(tagsFilterIdsSelector)).subscribe( {
            next: (tagIds) => {
                if (tagIds) {
                    console.log('tagIds: ', tagIds)
                    this.sourceStore.loadTagsFilterIds(tagIds)
                }             
            }
        })

        this.store.pipe(select(isAllTagFilterRequiredSelector)).subscribe( {
            next: (allTagsRequired) => {
                console.log('allTagsRequired: ', allTagsRequired)
                this.sourceStore.loadIsAllTagFilterRequired(allTagsRequired)
            }
        })

        
    }

    searchInputChange(searchInput : string){
        this.sourceStore.patchState({searchInput})
    }

    searchOptionsContainsMine(){
        return this.search_options_array.includes('owned')
    }

    onChangeOptions(value: string){
        console.log('new value options filter: ', value)
        const showOwned: boolean = value.includes('owned')
        const showOwnedPrivate: boolean = (showOwned) ? value.includes('private') : false
        const showUnowned: boolean = value.includes('unowned')
        this.sourceStore.patchState({
            optionsFilter: {
                showOwned,
                showOwnedPrivate,
                showUnowned
        }})
    }

    onChangeRequired(value: boolean){
        console.log('new value for all tags required: ', value)
        this.sourceStore.patchState({ isAllTagFilterRequired: value })
    }

    optionsNotEmpty(){
        return this.search_options_array.length > 0
    }
}