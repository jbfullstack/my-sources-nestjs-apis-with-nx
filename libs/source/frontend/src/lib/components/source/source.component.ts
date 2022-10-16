import { Observable, Subscription } from 'rxjs'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, Input, OnInit,  ElementRef,  ViewChild  } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'
import { deleteSourceAction, loadSourcesAction, updateSourceAction } from '../../store/actions/source.action'
import { sourceSelector, typeSelector } from '../../store/selectors/source.selector'
import { SourceInterface, SourceTypeInterface, TagInterface, UpdateSourceRequestInterface } from '@jbhive/types_fe'
import { currentUserSelector } from '@jbhive/auth_fe'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material/dialog'

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'
import { map, startWith } from 'rxjs/operators'
import { tagSelector } from '../../store/selectors/source.selector'
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
    selector: 'ms-source',
    templateUrl: './source.component.html',
    styleUrls: ['./source.component.scss'],
    providers: [SourceStore]
})
export class SourceComponent implements OnInit{
    @Input() source!: SourceInterface | null;
    @Input() searchParent: string = '';

    sourceTypesForm!: FormGroup;
    types: SourceTypeInterface[] = []
    selectedType!: SourceTypeInterface
    
    isOwnedByLoggedUser: boolean = false
    loggedUserId!: number


    newSourceTitle: string = ''
    newSourceUrl: string = ''
    newSourceContent: string = ''
    newSourceDescription: string = ''
    newSourcePublic: boolean = true
    newSourceType: number = 1
    newTagIds: number[] = []


    pending$ = this.sourceStore.pending$     
    loggedUserId$  = this.sourceStore.loggedUserId$
    showOwned$ = this.sourceStore.showOwned$
    showOwnedPrivate$ = this.sourceStore.showOwnedPrivate$
    showUnowned$ = this.sourceStore.showUnowned$  
    searchInput$ = this.sourceStore.searchInput$

    editMode: boolean = false

    // -- edit tag
    separatorKeysCodes: number[] = [ENTER, COMMA]
    tagCtrl = new FormControl('')
    filteredTags: Observable<string[]>
    tags: string[] = []

    
    tags$ = this.sourceStore.tags$
    allTags: TagInterface[] = []
    allTagsName: string[] = []

    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined

    positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];


    constructor(private formBuilder : FormBuilder, private store: Store, private sourceStore: SourceStore, private dialog: MatDialog) {
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
        console.log(this.source)   


        if (this.source){
            this.newSourceTitle = this.source.title
            this.newSourceUrl = this.source.url
            this.newSourceContent = this.source.content
            this.newSourceDescription = this.source.description
            this.newSourcePublic = this.source.public
            this.newSourceType = this.source.type.id
            this.newTagIds = this.getTagIds()
        }
        
        
        this.store.pipe(select(currentUserSelector)).subscribe( {
            next: (user) => {
                if (user) {
                    
                    this.loggedUserId = user.id

                }             
            }
        })

        this.store.pipe(select(typeSelector)).subscribe( {
            next: (types) => {
                if (types) {
                    this.sourceStore.loadTypes(types)
                    this.types = types

                    // -- Form
                    this.sourceTypesForm = this.formBuilder.group({
                        types: [null, Validators.required]
                    })
                    const typeKey = (this.source === null)? 0 : this.source.type.id - 1
                    const toSelect = types[typeKey]
                    this.sourceTypesForm.get('types')?.setValue(toSelect)
                }             
            }
        })

        this.store.pipe(select(tagSelector)).subscribe( {
            next: (tags) => {
                if (tags) {
                    this.allTags = tags
                    this.allTags.forEach( tag => this.allTagsName.push(tag.title))
                    if(this.source){
                        this.source.tags.forEach( tag => this.tags.push(tag.title))
                    }                   
                }             
            }
        })
    }

    hasTag(){
        return (this.source && this.source.tags.length > 0)
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


    printTagList(){
        if (this.source && this.source.tags.length > 0){
            let res = ''
            for( let tag of this.source.tags) {
                res +=  tag.title.charAt(0).toUpperCase() + tag.title.slice(1) + ', '
            }

            res = res.slice(0, -2)
            return res
        } else {
            return ''
        }
        
    }

    title(){
        if (this.source){
            if (this.source.title !== null){
                return this.source.title.toString()
            }
        }

        return ''
    }

    description(){
        if (this.source){
            if (this.source.description !== null){
                return this.source.description
            }
        }

        return ''
    }

    content(){
        if (this.source){
            if (this.source.content !== null){
                return this.source.content
            }
        }

        return ''
    }

    isPublicMessage(){
        if (this.source){
            if (this.source.public){
                return 'This source is public'
            } else {
                return 'This source is private'
            }
        }
        return 'Status undefined..'
    }

    print() : string{
        return "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled "
    }

    hasUrl(){
        if (this.source){
            if (this.source?.url && this.source?.url !== ''){
                return true
            }
        }
        return false
    }

    hasTitle(){
        if (this.source){
            if (this.source?.title && this.source?.title !== ''){
                return true
            }
        }
        return false
    }

    hasDescription(){
        if (this.source){
            if (this.source?.description && this.source?.description !== ''){
                return true
            }
        }
        return false
    }

    hasContent(){
        if (this.source){
            if (this.source?.content && this.source?.content !== ''){
                return true
            }
        }
        return false
    }

    isOwnedByLogedUser(){
        if (this.source){
            if (this.source.owner.id === this.loggedUserId){
                return true
            }
        }

        return false
    }

    edit(){
        this.editMode = true
    }

    editBack(){
        this.editMode = false
    }

    save(){
        console.log('tada: this.sourceTypesForm.get(types)?.value> ', this.sourceTypesForm.get('types')?.value)
        if (this.source){
            const req : UpdateSourceRequestInterface = {
                content: this.newSourceContent,
                description: this.newSourceDescription,
                public: this.newSourcePublic,
                url: this.newSourceUrl,
                title: this.newSourceTitle,
                typeId: this.sourceTypesForm.get('types')?.value.id,
                tagsIds: this.getTagIds()

            }
            this.store.dispatch(updateSourceAction({sourceId: this.source.id, input: req}))
    
    
            this.editMode = false
        }
        
    }
    
    delete(){
        
            const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
                data:{
                    message: 'Are you sure want to delete?',
                    buttonText: {
                        ok: 'Yes',
                        cancel: 'No'
                    }
                }
            });


            dialogRef.afterClosed().subscribe((confirmed: boolean) => {
                if (confirmed) {
                    if (this.source !== null){
                        this.store.dispatch(deleteSourceAction({id: this.source.id}))
                    }
                } else {
                    console.log('delete source action not confirmed')
                }
            });
        
        
    }

    retrieveHeaderImage(){
        if (this.source){
            // site web
            if (this.source.type.title === 'web'){
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsiy6TH-Vsd_XbJu8MGmdRNYdAZph_oJ379QevPG3O710BXGDNaYf8qBT6hmSFcbXn_8E&usqp=CAU"
            } else if (this.source.type.title === 'book'){
                return "https://previews.123rf.com/images/serhiibrovko/serhiibrovko1709/serhiibrovko170900039/85170783-livre-ouvert-3d-isol%C3%A9-sur-fond-transparent-illustration-vectorielle.jpg"
            } else{
                return "http://greenbookblog.org/wp-content/uploads/2013/12/other-button.jpg"
            }
        }

        return "https://image.shutterstock.com/image-vector/unknown-person-icon-anonymous-pictogram-600w-1391394830.jpg"
    }

    goToUrl(){
        window.open('www.google.fr', "_blank");
    }


    // --- Edit tag chips
    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim()

        // Add our tag
        if (value && !this.allTagsName.includes(value)) {
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

}2
