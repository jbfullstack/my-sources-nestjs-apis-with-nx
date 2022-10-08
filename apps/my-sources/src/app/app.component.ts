import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@jbhive_ai/api-interfaces';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedInSelector, loggedUserRole } from '@jbhive/auth_fe';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { logoutAction } from '@jbhive/auth_fe';

@Component({
  selector: 'my-sources-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  // hello$ = this.http.get<Message>('/api/getData');
  userLoggedSelector$!: Observable<boolean | null>
  userLoggedRoleSelector$!: Observable<number | null | undefined>

  constructor(
    private store: Store, 
    private router: Router, 
    ) {}

  ngOnInit(): void {
    this.initializeValues()
  }
  

  initializeValues(): void {
    this.userLoggedSelector$ = this.store.pipe(select(isLoggedInSelector))
    this.userLoggedRoleSelector$ = this.store.pipe(select(loggedUserRole))
  }

  logout() {
    this.store.dispatch(logoutAction())
    this.router.navigate(['login']);
  }

  isCurrentRoute(routeName: string) {
    return this.router.url === '/' + routeName;
  }

  // use to determine if some page are accessible or not in the nav-bar
  isAtLeastLord( role : number | null | undefined) {
    if ((role === null) || (role === undefined) || (role < 2)) {
      return false
    } else {
      return true
    }
  }

}
