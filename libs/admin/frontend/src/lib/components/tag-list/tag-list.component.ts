import { Component, Directive, Input, OnInit } from '@angular/core'
import { CurrentUserInterface, TagInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector';
import { AdminStore } from '../../store/stores/admin.store';
// import { AdminStore } from '../../store/stores/admin.store';



@Component({
    selector: 'ms-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],    
})
export class TagListComponent  implements OnInit {
    @Input() tags!: TagInterface[] | null;

    searchTagInput: string = ''
    searchTagInput$ = this.adminStore.searchTagInput$

    constructor(private store: Store, private adminStore: AdminStore) { }

    ngOnInit() {
        console.log(this.tags) // data from parent
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