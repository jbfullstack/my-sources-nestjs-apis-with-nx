import { Component, Directive, Input, OnInit } from '@angular/core'
import { UserInterface, UsersListStateInterface } from '@jbhive/types_fe'
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
    @Input() users!: UserInterface[] | null;

    searchUserInput: string = ''
    searchUserInput$ = this.adminStore.searchUserInput$

    constructor(private store: Store, private adminStore: AdminStore) { }

    ngOnInit() {
        console.log(this.users) // data from parent

        while(this.users === undefined) {
            console.log('init wait')
        }
    }

    getSearchInput() {
        if (this.searchUserInput === null || this.searchUserInput === undefined) {
            return 'N/A'
        } else {
            return this.searchUserInput
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