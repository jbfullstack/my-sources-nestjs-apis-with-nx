import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { AdminComponent } from './components/admin/admin.component'

import { AuthGuard, } from '@jbhive/auth_fe';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdminEffect } from './store/effects/admin.effect';
import { reducers } from './store/reducers/admin.reducers';
import { AdminService } from './services/admin.service';

const routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature([AdminEffect]),
  ],
  providers: [AdminService]
})
export class AdminModule {}
