import { Component, Directive, Input, OnInit } from '@angular/core'
import { CurrentUserInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector';
import { AdminService } from '../../services/admin.service';
import { AdminStore } from '../../store/stores/admin.store';
import { activateAction, deleteAction, desactivateAction, updateRoleAction } from '../../store/actions/admin.action';
// import { AdminStore } from '../../store/stores/admin.store';

interface Role {
    value: number;
    viewValue: string;
  }

@Component({
    selector: 'ms-manage-user',
    templateUrl: './manage-user.component.html',
    styleUrls: ['./manage-user.component.scss'],    
})
export class ManageUserComponent  implements OnInit {
    @Input() user!: CurrentUserInterface | null;

    loggedUserRoleId$ = this.adminStore.loggedUserRoleId$

    selectedRole!: number
    roles: Role[] = [
        {value: 0, viewValue: 'User'},
        {value: 1, viewValue: 'Buddy'},
        {value: 2, viewValue: 'Lord'},
        {value: 3, viewValue: 'Admin'},
    ];

    constructor(private store: Store, private adminStore: AdminStore) { }

    ngOnInit() {

        this.loggedUserRoleId$.subscribe({
            next: (roleId) => {                
                if (roleId) {
                    if (this.user?.id) {
                        console.log('ManageUserComponent.ngOnInit() -> user.id known')
            
                        if (roleId < 4) {
                            this.roles.splice(this.roles.length - 1, 1)
                        } 
                        if (roleId < 3) {
                            this.roles.splice(this.roles.length - 1, 1)
                        }
                        if (roleId < 2) {
                            this.roles.splice(this.roles.length - 1, 1)
                        }
                        if (roleId < 1) {
                            this.roles.splice(this.roles.length - 1, 1)
                        }
            
                        this.selectedRole = (this.user.role.id === null) ? 0 : this.user.role.id
                    }
                }             
            }
        })


        // this.store.pipe(select(activatedUsersSelector)).subscribe( {
        //     next: (allactivated) => {
        //       console.log('allActivated: ', allactivated)
        //       if (allactivated) {
                
        //         this.adminStore.loadActivatedUsers(allactivated)
        //       }             
        //     }
        //   })
        
        // if (this.user?.id) {
        //     console.log('ManageUserComponent.ngOnInit() -> user.id known')

        //     // if ((this.user.role.id) && this.user.role.id < 4) {
        //     //     this.roles.splice(this.roles.length - 1, 1)
        //     // } 
        //     if ((this.user.role.id) && this.user.role.id < 3) {
        //         this.roles.splice(this.roles.length - 1, 1)
        //     }
        //     if ((this.user.role.id) && this.user.role.id < 2) {
        //         this.roles.splice(this.roles.length - 1, 1)
        //     }
        //     if ((this.user.role.id) && this.user.role.id < 1) {
        //         this.roles.splice(this.roles.length - 1, 1)
        //     }

        //     this.selectedRole = (this.user.role.id === null) ? 0 : this.user.role.id
        // }
    }

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

    updateRole(){
        if (this.user?.id) {
            this.store.dispatch(updateRoleAction({userId: this.user.id, newRoleId: this.selectedRole}))
        }
    }
}

function regeneratePasswordAction(arg0: { userId: number; }): any {
    throw new Error('Function not implemented.');
}
