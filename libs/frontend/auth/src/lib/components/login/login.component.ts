import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { registerAction } from '../../store/actions/register-action'
import { isSubmittingSelector, validationErrorSelector } from '../../store/selector'
import { RegisterRequestInterface } from '../../types/register-request.interface'
import { BackendErrorsInterface } from '@jbhive_fe/types'
import { loginAction } from '../../store/actions/login-action'

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  form!: FormGroup
  isSubmittings$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(private formBuilder : FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }
  
  initializeForm(): void {
    this.form = this.formBuilder.group({
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required, , Validators.minLength(4)],
    })
  }

  initializeValues(): void {
    this.isSubmittings$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
  }

  onSubmit(): void {
    console.log("submit", this.form.value, this.form.valid)
    const request : RegisterRequestInterface = {...this.form.value}
    this.store.dispatch(loginAction( {request: request} ))
  }
}
