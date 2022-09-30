import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { registerAction } from '../../store/actions/register-action'
import { isSubmittingSelector, validationErrorSelector } from '../../store/selector'
import { RegisterRequestInterface } from '../../types/register-request.interface'
import { BackendErrorsInterface } from '@jbhive_fe/types'

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{
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
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  initializeValues(): void {
    this.isSubmittings$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
  }

  onSubmit(): void {
    console.log("submit", this.form.value, this.form.valid)
    const request : RegisterRequestInterface = {...this.form.value}
    this.store.dispatch(registerAction( {request: request} ))
  }
}
