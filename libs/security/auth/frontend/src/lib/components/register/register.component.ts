import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { registerAction } from '../../store/actions/register-action'
import { RegisterRequestInterface } from '../../types/register-request.interface'
import { BackendErrorsInterface } from '@jbhive/types_fe'
import { isSubmittingSelector, validationErrorSelector, isAccountCreated } from '../../store/selectors/register-selector'

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{
  form!: FormGroup
  isSubmittingsSelector$!: Observable<boolean>
  isAccountCreatedSelector$!: Observable<boolean | null>
  backendErrorsSelector$!: Observable<BackendErrorsInterface | null>
  

  constructor(private formBuilder : FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }
  
  initializeForm(): void {
    this.form = this.formBuilder.group({
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
      password: ['', [Validators.required, , Validators.minLength(4)]],
    })
  }

  initializeValues(): void {
    this.isSubmittingsSelector$ = this.store.pipe(select(isSubmittingSelector))
    this.isAccountCreatedSelector$ = this.store.pipe(select(isAccountCreated))
    this.backendErrorsSelector$ = this.store.pipe(select(validationErrorSelector))
    
  }

  onSubmit(): void {
    console.log("submit", this.form.value, this.form.valid)
    const request : RegisterRequestInterface = {...this.form.value}
    this.store.dispatch(registerAction( {request: request} ))
  }
}
