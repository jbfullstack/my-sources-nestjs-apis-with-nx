import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthGuard} from '@jbhive/auth_fe';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { ProfileService } from './profile.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileEffect } from './store/effects/profile.effect';
import { reducers } from './store/reducers/profile.reducers';

const routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    MatCheckboxModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([ProfileEffect]),
  ],
  // providers: [ProfileService],
  // exports: [ProfileService],
})
export class ProfileModule {}
