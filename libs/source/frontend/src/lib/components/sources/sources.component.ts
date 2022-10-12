import { Observable, Subscription } from 'rxjs'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'
import { loadSourcesAction } from '../../store/actions/source.action'
import { sourceSelector } from '../../store/selectors/source.selector'
import { SourceInterface } from '@jbhive/types_fe'


@Component({
    selector: 'ms-sources',
    templateUrl: './sources.component.html',
    styleUrls: ['./sources.component.scss'],
    providers: [SourceStore]
})
export class SourcesComponent implements OnInit{
    @Input() sources!: SourceInterface[] | null;

    pending$ = this.sourceStore.pending$       


    constructor(private formBuilder : FormBuilder, private store: Store, private sourceStore: SourceStore) { }

    ngOnInit(): void {
        this.initializeValues()
    }

    initializeValues(): void {
        console.log(this.sources)        
    }

    sourcesToActivate() {
        if (this.sources && this.sources.length > 0) {
            return true
        } else {
            return false
        }
    }
}