import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { BackendErrorsInterface, CurrentUserInterface, } from '@jbhive/types_fe'
import { loadDesactivatedUsersAction } from '../../store/actions/admin.action'
import { AdminUnactivatedUSersRequestInterface } from '../../types/admin-activated-users.request.interface.ts'

@Component({
  selector: 'ms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit{
  // form!: FormGroup
  // isSubmittingsSelector$!: Observable<boolean>
  // backendErrorsSelector$!: Observable<BackendErrorsInterface | null>
  currentUser!: CurrentUserInterface |null

  constructor(private formBuilder : FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    // this.isSubmittingsSelector$ = this.store.pipe(select(isSubmittingSelector))
    // this.backendErrorsSelector$ = this.store.pipe(select(validationErrorSelector))

    // this.store.select(currentUserSelector).subscribe(
    //   (data) => {
    //     this.currentUser = data
    //     this.store.dispatch(loadDesactivatedUsersAction())
    //   }
    // );

    console.log('DISPATCH MTFKA')
    this.store.dispatch(loadDesactivatedUsersAction())
  }

  onSubmit(): void {
    // console.log("submit", this.form.value, this.form.valid)
    // console.log("submit", this.form.value, this.form.controls['nickame'])
    // const request : LoginRequestInterface = {...this.form.value}
    // this.store.dispatch(loginAction( {request: request} ))
  }

}
