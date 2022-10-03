import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { tap, filter, first, map } from 'rxjs/operators';
import { BackendErrorsInterface, CurrentUserInterface } from '@jbhive/types_fe'
import { LoginRequestInterface, loginAction, isSubmittingSelector, validationErrorSelector, currentUserSelector } from '@jbhive/auth_fe'

@Component({
  selector: 'ms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
  form!: FormGroup
  isSubmittings$!: Observable<boolean>
  currentUserSelector$!: Observable<CurrentUserInterface | null>
  currentUser!: CurrentUserInterface | null
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
    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))

    this.store.select(currentUserSelector).subscribe(
      (data) => this.currentUser = data
    );
  }

  onSubmit(): void {
    console.log("submit", this.form.value, this.form.valid)
    console.log("submit", this.form.value, this.form.controls['nickame'])
    const request : LoginRequestInterface = {...this.form.value}
    this.store.dispatch(loginAction( {request: request} ))
  }

  isCurrentUSerLoaded(): boolean{
    if (this.currentUser === null){
      return false
    }
    return true
  }

  email() {
    return this.currentUser?.email
  }

  pseudo() {
    return this.currentUser?.pseudo
  }

  roleId() {
    return this.currentUser?.role?.id
  }

  roleName() {
    return this.currentUser?.role?.name
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(currentUserSelector),
      tap((loaded: CurrentUserInterface | null) => {
        if (!loaded) {
          // this.store.dispatch(new LoadOrdersRequested());
          // this.router.navigate(['login']);
        }
      }),
      filter((loaded: any) => loaded),
      first()
    );
  }
}
