import { Observable, Subscription } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'


@Component({
    selector: 'ms-source',
    templateUrl: './source.component.html',
    styleUrls: ['./source.component.scss'],
    providers: [SourceStore]
})
export class SourceComponent implements OnInit{

    constructor(private formBuilder : FormBuilder, private store: Store, private sourceStore: SourceStore) { }

    ngOnInit(): void {
        this.initializeValues()
    }

    initializeValues(): void {

    }

}