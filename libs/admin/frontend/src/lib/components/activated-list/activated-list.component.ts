import { Component, Directive, Input, OnInit } from '@angular/core'
import { CurrentUserInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector';
import { AdminStore } from '../../store/stores/admin.store';
import { updateSearchInputAction } from '../../store/actions/admin.action';
// import { AdminStore } from '../../store/stores/admin.store';



@Component({
    selector: 'ms-activated-list',
    templateUrl: './activated-list.component.html',
    styleUrls: ['./activated-list.component.scss'],    
})
export class ActivatedListComponent  implements OnInit {
    @Input() users!: CurrentUserInterface[] | null;

    displayedUsers:  CurrentUserInterface[] = []
    searchInput: string = ''
    searchInput$ = this.adminStore.searchInput$

    constructor(private store: Store, private adminStore: AdminStore) { }

    ngOnInit() {
        console.log(this.users) // data from parent

        while(this.users === undefined) {
            console.log('init wait')
        }
        this.displayedUsers  = Object.assign([], this.users)
        // this.searchInput = ''
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

    updateDisplayedUsers() {
        console.log('updateDisplayedUsers.received()))')
        this.searchInput = ''
        this.searchInputChange(this.searchInput)
    }

    searchInputChange(newValue: string) {
        // this.store.dispatch(updateSearchInputAction({newValue}))
        if (this.searchInput === null || this.searchInput === undefined || this.searchInput.trim() === '') {
            if (this.displayedUsers.length !== this.users?.length) {
                // Reload
                this.displayedUsers  = Object.assign([], this.users);
            }
        } else {
            // apply filter
            if (this.users) {
                this.displayedUsers  = this.users?.filter( user => user.pseudo.includes(newValue) || user.email.includes(newValue))
            }
        }
    }
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}