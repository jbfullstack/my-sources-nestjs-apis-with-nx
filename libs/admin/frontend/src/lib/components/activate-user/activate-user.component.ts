import { Component, Directive, Input, OnInit } from '@angular/core'
import { CurrentUserInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector';
import { AdminService } from '../../services/admin.service';
// import { AdminStore } from '../../store/stores/admin.store';



@Component({
    selector: 'ms-activate-user',
    templateUrl: './activate-user.component.html',
    styleUrls: ['./activate-user.component.scss'],    
})
export class ActivateUserComponent  implements OnInit {
    @Input() user!: CurrentUserInterface | null;

    constructor(private adminService: AdminService) { }

    ngOnInit() {
        console.log(this.user) // data from parent
    }

    activate(){
        if (this.user?.id) {
            this.adminService.activate(this.user.id)
        }
        // TODO : manage error
    }
}