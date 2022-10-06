
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
} from '@angular/common/http';
import { switchMap, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { userTokenSelector } from '@jbhive/auth_fe'


@Injectable()
export class ApolloInterceptor implements HttpInterceptor {

    constructor (private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Yoo interceptor: ', req)
        return this.store.select(userTokenSelector).pipe(
            first(),
            switchMap(token => {
                const authReq = !!token ? req.clone({
                    setHeaders: { Authorization: 'Bearer ' + token },
                }) : req;
                return next.handle(authReq);
            }),
        );
    }
}