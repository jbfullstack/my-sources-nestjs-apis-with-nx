import { Observable, Subscription } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { BackendErrorsInterface, CurrentUserInterface, UsersListStateInterface, } from '@jbhive/types_fe'
import { loadDesactivatedUsersAction } from '../../store/actions/admin.action'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector'
import { AdminStore } from '../../store/stores/admin.store'

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
  pending$ = this.adminStore.pending$
  errors$ = this.adminStore.errors$

  constructor(private formBuilder : FormBuilder, private store: Store, private adminStore: AdminStore) { }
  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy() {
    // this.desactivatedListSubscription.unsubscribe();
  }

  initializeValues(): void {
    console.log('DISPATCH MTFKA')
    this.store.dispatch(loadDesactivatedUsersAction())
    // this.adminStore.loadDesactivatedUsers(this.desactivatedUsers$)

    this.store.pipe(select(desactivatedUsersSelector)).subscribe( {
      next: (allDesactivated) => {
        if (allDesactivated.length > 0) {
          console.log('allDesactivated: ', allDesactivated)
          this.adminStore.loadDesactivatedUsers(allDesactivated)
        }        
      }
    })

    // this.desactivatedUsersSelector$ = this.store.pipe(select(desactivatedUsersSelector))
    // this.desactivatedListSubscription = this.store.pipe(select(desactivatedUsersSelector)).subscribe( allDesactivated =>  this.desactivatedList = allDesactivated?.users)
  }

  onSubmit(): void {
    // console.log("submit", this.form.value, this.form.valid)
    // console.log("submit", this.form.value, this.form.controls['nickame'])
    // const request : LoginRequestInterface = {...this.form.value}
    // this.store.dispatch(loginAction( {request: request} ))
  }

  // getDesactivatedUsers(){
  //   let res : UsersListStateInterface =  {
  //     users: this.desactivatedUsersSelector$
  //   }


}
