import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { BackendErrorsInterface } from '@jbhive/types_fe'
import { LoginRequestInterface, loginAction, isSubmittingSelector, validationErrorSelector } from '@jbhive/auth_fe'

@Component({
  selector: 'ms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
  form!: FormGroup
  isSubmittings$!: Observable<boolean>
  // currentUserSelector$!: Observable<
  backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(private formBuilder : FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }
  
  initializeForm(): void {
    this.form = this.formBuilder.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, , Validators.minLength(4)]],
    })
  }

  initializeValues(): void {
    this.isSubmittings$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
  }

  onSubmit(): void {
    console.log("submit", this.form.value, this.form.valid)
    console.log("submit", this.form.value, this.form.controls['nickame'])
    const request : LoginRequestInterface = {...this.form.value}
    this.store.dispatch(loginAction( {request: request} ))
  }
}
