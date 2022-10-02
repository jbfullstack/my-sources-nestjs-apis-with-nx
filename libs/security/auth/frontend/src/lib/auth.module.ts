import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { RegisterComponent } from './components/register/register.component';
// import { LoginComponent } from './components/login/login.component';
import { reducers } from './store/reducers/auth-reducers';
import { RegisterEffect } from './store/effects/register.effect';

import { AuthService } from './services/auth.service';
import { PersistanceService } from './services/persistance.service';

import { BackendErrorMessagesModule } from '@jbhive/types_fe';
import { LoginComponent } from './components/login/login.component';
import { LoginEffect } from './store/effects/login.effect';



const routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect, LoginEffect]),
    BackendErrorMessagesModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService]
})
export class AuthModule {}
