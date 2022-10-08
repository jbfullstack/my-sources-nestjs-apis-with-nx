import { Observable, Subscription } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { BackendErrorsInterface, CurrentUserInterface, UsersListStateInterface, } from '@jbhive/types_fe'
import { loadActivatedUsersAction, loadDesactivatedUsersAction, loadDesactivatedUsersSuccessAction } from '../../store/actions/admin.action'
import { activatedUsersSelector, desactivatedUsersSelector } from '../../store/selectors/admin.selector'
import { AdminStore } from '../../store/stores/admin.store'
import { loggedUserRole } from '@jbhive/auth_fe'

@Component({
  selector: 'ms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [AdminStore]
})
export class AdminComponent implements OnInit{
  // desactivatedUsersSelector$!: Observable<UsersListStateInterface | null>
  // desactivatedListSubscription!: Subscription
  // desactivatedList!: CurrentUserInterface[] | undefined

  desactivatedUsers$ = this.adminStore.desactivatedUsersList$
  activatedUsers$ = this.adminStore.activatedUsersList$
  pending$ = this.adminStore.pending$
  errors$ = this.adminStore.errors$
  loggedUserRoleId$ = this.adminStore.loggedUserRoleId$

  constructor(private formBuilder : FormBuilder, private store: Store, private adminStore: AdminStore) { }
    
  ngOnInit(): void {
      this.initializeValues()
    }

  ngOnDestroy() {
    // this.desactivatedListSubscription.unsubscribe();
  }

  initializeValues(): void {
    console.log('DISPATCH MTFKA')
    this.store.pipe(select(loggedUserRole)).subscribe( {
      next: (roleId) => {
        if (roleId) {
            console.log('roleId: ', roleId)
            this.adminStore.loadLoggedUserRoleId(roleId)
        }
      }
    })

    this.store.dispatch(loadDesactivatedUsersAction())
    this.store.dispatch(loadActivatedUsersAction())
    // this.adminStore.loadDesactivatedUsers(this.desactivatedUsers$)

    this.store.pipe(select(desactivatedUsersSelector)).subscribe( {
      next: (allDesactivated) => {
        if (allDesactivated) {
          console.log('allDesactivated: ', allDesactivated)
          this.adminStore.loadDesactivatedUsers(allDesactivated)
        }             
      }
    })

    this.store.pipe(select(activatedUsersSelector)).subscribe( {
      next: (allactivated) => {
        console.log('allActivated: ', allactivated)
        if (allactivated) {
          
          this.adminStore.loadActivatedUsers(allactivated)
        }             
      }
    })
    
  }

  onSubmit(): void {
    // console.log("submit", this.form.value, this.form.valid)
    // console.log("submit", this.form.value, this.form.controls['nickame'])
    // const request : LoginRequestInterface = {...this.form.value}
    // this.store.dispatch(loginAction( {request: request} ))
  }


}
