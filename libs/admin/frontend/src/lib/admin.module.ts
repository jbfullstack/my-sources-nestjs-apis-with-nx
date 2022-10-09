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
import { WaitingListComponent } from './components/waiting-list/waiting-list.component';
import { AdminStore } from './store/stores/admin.store';



const routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  }
]


@NgModule({
  // declarations: [ AdminComponent, WaitingListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature([AdminEffect]),
  ],
  providers: [AdminService, AdminStore]
})
export class AdminModule {}
