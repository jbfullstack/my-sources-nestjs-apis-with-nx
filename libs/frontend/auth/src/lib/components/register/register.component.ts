import { Component, OnInit } from '@angular/core'
// import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{
  // form: FormGroup

  // constructor(private formBuilder : FormBuilder) {}


  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    // this.form = this.formBuilder
  }
}
