import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { tap, filter, first, map } from 'rxjs/operators';
import { BackendErrorsInterface, UserInterface, ProfileUserStateInterface, AuthStateInterface } from '@jbhive/types_fe'
import { LoginRequestInterface, loginAction, isSubmittingSelector, validationErrorSelector, currentUserSelector, updateCurentUserAction } from '@jbhive/auth_fe'
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UpdateUserProfileRequestInterface } from '../../update-user-profile-request.interface';
import { updateUserProfileAction } from '../../store/actions/profile.action';
import { ProfileStore } from '../../store/store/profile.store';

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
  savedToken: string = ''

  isSubmittings$!: Observable<boolean>
  currentUserSelector$!: Observable<UserInterface | null>
  currentUser!: UserInterface | null
  // currentUserSelector$!: Observable<
  backendErrors$!: Observable<BackendErrorsInterface | null>

  pending$ = this.profileStore.pending$
  // errors$ = this.adminStore.errors$
  pseudo$ = this.profileStore.pseudo$
  email$ = this.profileStore.email$
  roleName$ = this.profileStore.roleName$
  createdAt$ = this.profileStore.createdAt$
  id$ = this.profileStore.id$

  constructor(private formBuilder : FormBuilder, private store: Store, private profileStore: ProfileStore) {}

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
    // this.isSubmittings$ = this.store.pipe(select(isSubmittingSelector))
    // this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
    // this.currentUserSelector$ = this.store.pipe(select(currentUserSelector))
    

    this.store.select(currentUserSelector).subscribe(
      (data) => {
        this.currentUser = data    
        console.log('retrieved user :', this.currentUser)
        if ( this.currentUser !== null) {
          this.profileStore.loadProfileUser(this.currentUser)
          this.pseudo_input = this.currentUser.pseudo
          this.nickname_input = this.getValue(this.currentUser.nickname)
          this.email_input = this.currentUser.email
          this.savedToken =  this.getValue(this.currentUser.token)
        }
      }
    );
  }
  getValue(element: string | undefined | null): string {
    if (element === undefined || element == null) {
      return 'N/A'
    } else {
      return element
    }
  }


  isCurrentUSerLoaded(): boolean{
    if (this.currentUser === null){
      return false
    }
    return true
  }

  // email() {
  //   return this.email$
  // }

  // pseudo() {
  //   return this.currentUser?.pseudo
  // }

  // roleId() {
  //   return this.currentUser?.role?.id
  // }

  // roleName() {
  //   return this.currentUser?.role?.name
  // }

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

  save(){
    if (this.pseudo_input===null || this.nickname_input===null || this.email_input===null || this.password_input===null ||
      this.pseudo_input===undefined || this.nickname_input===undefined || this.email_input===undefined || this.password_input===undefined) {
      console.error('at least one field is null')
      return
    }else {
      
    
      this.updateStores()
    }
    


  }
  updateStores() {
      const pseudo: string = this.pseudo_input
      const nickname: string = this.nickname_input
      const email: string = this.email_input
      const password: string = this.password_input

      // Update profile
      if( this.isEditPasswordChecked() ){
        this.store.dispatch(updateUserProfileAction( { pseudo: pseudo, nickname: nickname, email: email, password: password} ))
      } else {
        this.store.dispatch(updateUserProfileAction( { pseudo: pseudo, nickname: nickname, email: email, password: '' } ))
      }

      const newUserProfile: ProfileUserStateInterface = {
        user: {
          id: (this.currentUser?.id) ? this.currentUser.id : 0,
          pseudo: pseudo,
          email: email,
          nickname: nickname,
          createdAt: (this.currentUser?.createdAt) ? this.currentUser.createdAt : '',
          role: (this.currentUser?.role) ? this.currentUser?.role : { id: 0, name: 'user'}
        },
        pending: false
      }
      
      // update profileStore
      this.profileStore.patchState({
        user: newUserProfile.user
      })

      // Update global store
      const newCurrentUser : UserInterface = {
        id: newUserProfile.user.id,
        pseudo: newUserProfile.user.pseudo,
        email: newUserProfile.user.email,
        nickname: newUserProfile.user.nickname,
        createdAt: newUserProfile.user.createdAt,
        role: {
          id: newUserProfile.user.role.id,
          name: newUserProfile.user.role.name
        },
        image: null,
        token: this.savedToken 
      }

      const authState: AuthStateInterface = {
        login: {
          isLoggedIn: true,
          isSubmitting: false,
          validationErrors: null,
          currentUser: newCurrentUser
        },
        register: {
          isAccountCreated: false,
          isSubmitting: false,
          validationErrors: null
        }
      }

      this.store.dispatch(updateCurentUserAction({ authState}))

  }
}
