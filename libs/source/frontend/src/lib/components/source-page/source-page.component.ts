import { map, Observable, startWith, Subscription } from 'rxjs'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'
import { createSourceAction, loadSourcesAction, loadTagsAction, loadTypesAction } from '../../store/actions/source.action'
import { isAllTagFilterRequiredSelector, sourceSelector, tagSelector, tagsFilterIdsSelector, typeSelector } from '../../store/selectors/source.selector'
import { currentUserSelector } from '@jbhive/auth_fe'
import { CreateSourceRequestInterface, SourceTypeInterface, TagInterface } from '@jbhive/types_fe'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'


@Component({
    selector: 'ms-source-page',
    templateUrl: './source-page.component.html',
    styleUrls: ['./source-page.component.scss'],
    providers: [SourceStore]
})
export class SourcePageComponent implements OnInit{

    sourceTypesForm!: FormGroup;

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

    types: SourceTypeInterface[] = []
    selectedType!: SourceTypeInterface


    // --- chips
    separatorKeysCodes: number[] = [ENTER, COMMA]
    tagCtrl = new FormControl('')
    filteredTags: Observable<string[]>
    tags: string[] = []

    allTags: TagInterface[] = []
    allTagsName: string[] = []

    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined

    constructor(private formBuilder : FormBuilder, private store: Store, private sourceStore: SourceStore) { 
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
                map((tag: string | null) => tag ? this._filter(tag) : this.allTagsName.slice()
            )
        )
    }

    ngOnInit(): void {

        this.initializeValues()
    }

    initializeValues(): void {

        this.store.dispatch(loadSourcesAction())
        this.store.dispatch(loadTagsAction())
        this.store.dispatch(loadTypesAction())

        this.store.pipe(select(tagSelector)).subscribe( {
            next: (tags) => {
                if (tags) {
                    this.allTags = tags
                    this.allTags.forEach( tag => this.allTagsName.push(tag.title))
                }             
            }
        })

        this.store.pipe(select(sourceSelector)).subscribe( {
            next: (sources) => {
                if (sources) {
                    console.log('sources: ', sources)
                    this.sourceStore.loadSources(sources)
                }             
            }
        })

        this.store.pipe(select(typeSelector)).subscribe( {
            next: (types) => {
                if (types) {
                    console.log('types: ', types)
                    this.sourceStore.loadTypes(types)
                    this.types = types

                    // -- Form
                    this.sourceTypesForm = this.formBuilder.group({
                        types: [null, Validators.required]
                    })
                    const toSelect = types[0]
                    this.sourceTypesForm.get('types')?.setValue(toSelect)
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

    isValid(){
        if (this.newSourceTitle.trim() === '') {
            return false
        } else {

            if (this.newSourceUrl.trim() !== '' && this.isValidHttpUrl(this.newSourceUrl) ){
                return true
            }

            if ( this.newSourceDescription.trim() !== '' || this.newSourceContent.trim() !== '') {
                return true
            }
        }
        
        return false
    }

    isValidHttpUrl(str: string) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
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

    save(){
        console.log('this.selectedType: ', this.selectedType)
        console.log('this.sourceTypesForm.get(types): ', this.sourceTypesForm.get('types')?.value.id)
        const source: CreateSourceRequestInterface = {
            public: this.newSourcePublic,
            title: this.newSourceTitle,
            content: this.newSourceContent,
            description: this.newSourceDescription,
            url: this.newSourceUrl,
            typeId: this.sourceTypesForm.get('types')?.value.id,
            tagsIds: this.getTagIds()
        }
        console.log('source: ', source)
        this.store.dispatch(createSourceAction({request: source}))
    }

    getTagIds(): number[] {

        let res: number[] = []
        for(var t of this.tags){
            const found = this.allTags.find( tag => tag.title === t)
            if (found){
                res.push(found.id)
            }
        }
        return res
    }

    // -- chips
    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim()

        // Add our tag
        if (value && !this.tags.includes(value)) {
            this.tags.push(value)
        }

        // Clear the input value
        event.chipInput!.clear()

        this.tagCtrl.setValue(null)
    }

    remove(value: string): void {
        const index = this.tags.indexOf(value)

        if (index >= 0) {
            this.tags.splice(index, 1)
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        if (!this.tags.includes(event.option.viewValue)) {
            this.tags.push(event.option.viewValue)
            if (this.tagInput != null){
                this.tagInput.nativeElement.value = ''
            }
            
            this.tagCtrl.setValue(null)
        }
        
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase()

        return this.allTagsName.filter((tag) =>
            tag.toLowerCase().includes(filterValue) && !this.tags.includes(tag)
        )
    }
}
