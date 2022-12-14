import { Component, Directive, Input, OnInit } from '@angular/core'
import { CurrentUserInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector';
import { AdminStore } from '../../store/stores/admin.store';
import { updateSearchUserInputAction } from '../../store/actions/admin.action';
// import { AdminStore } from '../../store/stores/admin.store';



@Component({
    selector: 'ms-activated-list',
    templateUrl: './activated-list.component.html',
    styleUrls: ['./activated-list.component.scss'],    
})
export class ActivatedListComponent  implements OnInit {
    @Input() users!: CurrentUserInterface[] | null;

    searchInput: string = ''
    searchInput$ = this.adminStore.searchUserInput$

    constructor(private store: Store, private adminStore: AdminStore) { }

    ngOnInit() {
        console.log(this.users) // data from parent

        while(this.users === undefined) {
            console.log('init wait')
        }
    }

    getSearchInput() {
        if (this.searchInput === null || this.searchInput === undefined) {
            return 'N/A'
        } else {
            return this.searchInput
        }
    }

    usersToActivate() {
        if (this.users && this.users.length > 0) {
            return true
        } else {
            return false
        }
    }

    searchInputChange(searchInput: string) {
        this.adminStore.patchState({searchUserInput: searchInput})
    }
}