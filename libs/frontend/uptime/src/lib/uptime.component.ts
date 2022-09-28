import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';

@Component({
    selector: 'app-uptime',
    templateUrl: `uptime.component.html`,
})
export class UptimeComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    uptime: any;

    private querySubscription: Subscription = new Subscription;

    constructor(private apollo: Apollo, private store: Store<{ uptime: number }>) {
        // Connect `this.count$` stream to the current store `count` state
        this.uptime = store.select('uptime');
    }

    ngOnInit() {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: gql`query {uptime}`
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                this.loading = loading;
                this.uptime = data.uptime;
            });
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }
}