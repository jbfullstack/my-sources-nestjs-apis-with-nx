import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { MatChipInputEvent } from '@angular/material/chips'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'

import { SourceInterface, TagInterface } from '@jbhive/types_fe'
import { tagSelector } from '../../store/selectors/source.selector'
import { addTagAction, removeTagAction } from '../../store/actions/source.action'

@Component({
    selector: 'ms-autocomplete-tag-chips',
    templateUrl: './autocomplete-tag-chips.component.html',
    styleUrls: ['./autocomplete-tag-chips.component.scss'],
    providers: [SourceStore],
    })
export class AutocompleteTagChipsComponent implements OnInit{ 
    
    separatorKeysCodes: number[] = [ENTER, COMMA]
    tagCtrl = new FormControl('')
    filteredTags: Observable<string[]>
    tags: string[] = []

    
    tags$ = this.sourceStore.tags$
    allTags: TagInterface[] = []
    allTagsName: string[] = []

    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined

    constructor(private store: Store, private sourceStore: SourceStore) {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTagsName.slice()
        )
        )
    }

    ngOnInit(): void {
        this.initializeValues()
    }

    initializeValues(): void {
        this.store.pipe(select(tagSelector)).subscribe( {
            next: (tags) => {
                if (tags) {
                    this.allTags = tags
                    this.allTags.forEach( tag => this.allTagsName.push(tag.title))
                }             
            }
        })
        
    }


    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim()

        // Add our tag
        if (value) {
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

        const foundTag = this.allTags.find( tag => tag.title === value)
        if (foundTag){
            this.store.dispatch(removeTagAction({id: foundTag.id}))
        } else {
            console.error(`tag to remove '${value}'' not found..`)
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tags.push(event.option.viewValue)
        if (this.tagInput != null){
            this.tagInput.nativeElement.value = ''
        }
        
        this.tagCtrl.setValue(null)

        const foundTag = this.allTags.find( tag => tag.title === event.option.viewValue)
        if (foundTag){
            this.store.dispatch(addTagAction({id: foundTag.id}))
        } else {
            console.error(`tag to add '${event.option.viewValue}'' not found..`)
        }
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase()

        return this.allTagsName.filter((fruit) =>
        fruit.toLowerCase().includes(filterValue)
        )
    }
}
