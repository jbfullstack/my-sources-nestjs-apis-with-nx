import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@jbhive_ai/api-interfaces';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedInSelector } from '@jbhive/auth_fe';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { AuthService } from 'libs/security/auth/frontend/src/lib/services/auth.service';

@Component({
  selector: 'my-sources-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  // hello$ = this.http.get<Message>('/api/getData');
  userLoggedSelector$!: Observable<boolean | null>

  constructor(
    private store: Store, 
    private contexts: ChildrenOutletContexts,
    private router: Router, 
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.initializeValues()
  }
  

  initializeValues(): void {
    this.userLoggedSelector$ = this.store.pipe(select(isLoggedInSelector))
  }

  getRouteAnimationData() {
    // console.log(` + AppComponent.getRouteAnimationData(${JSON.stringify(this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'])}`);
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  isCurrentRoute(routeName: string) {
    return this.router.url === '/' + routeName;
  }

}
