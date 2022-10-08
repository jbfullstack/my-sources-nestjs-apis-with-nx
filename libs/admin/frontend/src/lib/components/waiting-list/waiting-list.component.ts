import { Component, Directive, Input, OnInit } from '@angular/core'
import { CurrentUserInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector';
// import { AdminStore } from '../../store/stores/admin.store';



@Component({
    selector: 'ms-waiting-list',
    templateUrl: './waiting-list.component.html',
    styleUrls: ['./waiting-list.component.scss'],    
})
export class WaitingListComponent  implements OnInit {
    @Input() users!: CurrentUserInterface[] | null;

    constructor() { }

    ngOnInit() {
        console.log(this.users) // data from parent
    }

    usersToActivate() {
        if (this.users && this.users.length > 0) {
            return true
        } else {
            return false
        }
    }
}