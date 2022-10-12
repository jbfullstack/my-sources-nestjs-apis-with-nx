import { Component, Directive, Input, OnInit } from '@angular/core'
import { UserInterface, TagInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector, tagsSelector } from '../../store/selectors/admin.selector';
import { AdminStore } from '../../store/stores/admin.store';
import { createTagAction, loadActivatedUsersAction, loadTagsAction } from '../../store/actions/admin.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AdminStore } from '../../store/stores/admin.store';



@Component({
    selector: 'ms-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],    
})
export class TagListComponent  implements OnInit {
    form!: FormGroup
    title: string = ''
    description: string = ''
    @Input() tags!: TagInterface[] | null;

    searchTagInput: string = ''
    searchTagInput$ = this.adminStore.searchTagInput$

    

    constructor(private formBuilder : FormBuilder, private store: Store, private adminStore: AdminStore) { }

    ngOnInit() {
        this.initializeForm()

        this.store.dispatch(loadTagsAction())
        this.store.pipe(select(tagsSelector)).subscribe( {
            next: (tags) => {
                console.log('tags: ', tags)
                if (tags) {          
                this.adminStore.loadTags(tags)
                }             
            }
        })        
    }

    initializeForm(): void {
        this.form = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            description: ['', [Validators.required, , Validators.minLength(6)]],
        })
    }

    onSubmit(): void {
        // console.log("submit", this.form.value, this.form.valid)
        // console.log("submit", this.form.value, this.form.controls['nickame'])
        // const request : LoginRequestInterface = {...this.form.value}
        // this.store.dispatch(loginAction( {request: request} ))
        // const request = {title: this.title, description: this.description}
        // console.log('create tag: ', request)
        this.store.dispatch(createTagAction( {title: this.title, description: this.description} ))
    }


    getSearchInput() {
        if (this.searchTagInput === null || this.searchTagInput === undefined) {
            return 'N/A'
        } else {
            return this.searchTagInput
        }
    }

    tagsToDisplay () {
        if (this.tags && this.tags.length > 0) {
            return true
        } else {
            return false
        }
    }

    searchTagInputChange(searchTagInput: string) {
        this.adminStore.patchState({searchTagInput})
    }

    

}