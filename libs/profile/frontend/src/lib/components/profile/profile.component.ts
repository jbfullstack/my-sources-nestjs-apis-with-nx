import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { tap, filter, first, map } from 'rxjs/operators';
import { BackendErrorsInterface, CurrentUserInterface } from '@jbhive/types_fe'
import { LoginRequestInterface, loginAction, isSubmittingSelector, validationErrorSelector, currentUserSelector } from '@jbhive/auth_fe'
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UpdateUserProfileRequestInterface } from '../../update-user-profile-request.interface';
import { updateUserProfileAction } from '../../store/actions/profile.action';

@Component({
  selector: 'ms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
  form!: FormGroup

  enable = this.formBuilder.group({
    edit_password: false
  })

  pseudo_input: string = ''
  nickname_input: string = ''
  email_input: string = ''
  password_input: string = ''

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
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
      password: [{value: '', disabled: true}, [Validators.required, Validators.minLength(4)]],
    })
  }

  initializeValues(): void {
    this.isSubmittings$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
    this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    

    this.store.select(currentUserSelector).subscribe(
      (data) => {
        this.currentUser = data
        this.pseudo_input = ""+data?.pseudo
        this.nickname_input = ""+data?.nickname
        this.email_input = ""+data?.email
      }
    );
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

  createdAt(){
    return this.currentUser?.createdAt
  }

  onChangeCheckbox(value: any){
    if(value.checked){
      this.form.get('password')?.enable();
    } else {
      this.form.get('password')?.disable();
    }
  }

  isEditPasswordChecked(){
    const value = this.enable.get("edit_password")?.value
    if (value === null || value === undefined || value === false) {
      return false
    } else {
      return true
    }
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
    )
  }

  onSubmit(){
    const request: UpdateUserProfileRequestInterface = {
      pseudo: this.pseudo_input,
      nickname: this.nickname_input,
      email: this.pseudo_input,
      password: this.password_input,
    }
    if( ! this.isEditPasswordChecked() ){
      delete request.password
    }
    
    this.store.dispatch(updateUserProfileAction( {request: request} ))
  }
}
