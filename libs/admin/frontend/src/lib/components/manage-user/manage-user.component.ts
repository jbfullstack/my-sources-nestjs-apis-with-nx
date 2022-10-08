import { Component, Directive, Input, OnInit } from '@angular/core'
import { CurrentUserInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector';
import { AdminService } from '../../services/admin.service';
import { AdminStore } from '../../store/stores/admin.store';
import { activateAction, deleteAction, desactivateAction } from '../../store/actions/admin.action';
// import { AdminStore } from '../../store/stores/admin.store';



@Component({
    selector: 'ms-manage-user',
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.scss'],    
})
export class ManageUserComponent  implements OnInit {
    @Input() user!: CurrentUserInterface | null;

    constructor(private store: Store) { }

    ngOnInit() {}

    desactivate(){
        if (this.user?.id) {
            console.log('this.store.dispatch(desactivateAction())')
            this.store.dispatch(desactivateAction({userId: this.user.id}))
        }
    }

    delete(){
        if (this.user?.id) {
            this.store.dispatch(deleteAction({userId: this.user.id}))
        }
    }

    regeneratePassword(){
        if (this.user?.id) {
            this.store.dispatch(regeneratePasswordAction({userId: this.user.id}))
        }
    }
}

function regeneratePasswordAction(arg0: { userId: number; }): any {
    throw new Error('Function not implemented.');
}
