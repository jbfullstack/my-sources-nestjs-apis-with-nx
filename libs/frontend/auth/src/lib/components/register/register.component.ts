import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'

import { registerAction } from '../../store/action'
import { isSubmittingSelector } from '../../store/selector'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{
  form!: FormGroup
  isSubmittings$!: Observable<boolean>

  constructor(private formBuilder : FormBuilder, private store: Store, private authService: AuthService) {}


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
    console.log('isSubmiting$', this.isSubmittings$)
  }

  onSubmit(): void {
    console.log("submit", this.form.value, this.form.valid)
    this.store.dispatch(registerAction(this.form.value))
    this.authService.register(this.form.value)
  }
}
