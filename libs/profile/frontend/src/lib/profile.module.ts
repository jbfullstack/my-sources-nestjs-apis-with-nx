import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthGuard } from '@jbhive/auth_fe';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),],
})
export class ProfileModule {}
