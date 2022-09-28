import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement, reset } from '../counter.actions';

@Component({
    selector: 'app-my-counter',
    templateUrl: './my-counter.component.html',
})
export class MyCounterComponent {
    count$: Observable<number>

    constructor(private store: Store<{ count: number }>) {
        // Connect `this.count$` stream to the current store `count` state
        this.count$ = store.select('count');
    }

    increment() {
        // Dispatch an increment action
        this.store.dispatch(increment());
    }

    decrement() {
        // Dispatch a decrement action
        this.store.dispatch(decrement());
    }

    reset() {
        // Dispatch a reset action
        this.store.dispatch(reset());
    }
}