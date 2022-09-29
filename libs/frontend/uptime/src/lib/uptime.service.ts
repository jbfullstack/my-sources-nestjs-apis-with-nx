
import { HttpClient } from "@angular/common/http";
import { Injectable, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { createAction, Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { Uptime } from "./models/uptime";

@Injectable({
    providedIn: "root"
})
export class UptimeService {
    constructor(private apollo: Apollo) { }

    privatebaseUrl: string = "http://localhost:3000/products/";
    // private querySubscription: Subscription = new Subscription;
    
    getUptime() {
        const uptime = this.apollo.query<any>({
            query: gql`query {uptime}`,
        })
        return uptime
    }
}