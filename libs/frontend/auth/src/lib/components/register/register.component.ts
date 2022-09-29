import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { registerAction } from '../../store/action'

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{
  form!: FormGroup

  constructor(private formBuilder : FormBuilder, private store: Store) {}


  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
    console.log("submit", this.form.value, this.form.valid)
    this.store.dispatch(registerAction(this.form.value))
  }
}
