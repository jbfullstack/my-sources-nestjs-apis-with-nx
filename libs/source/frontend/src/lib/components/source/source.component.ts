import { Observable, Subscription } from 'rxjs'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'
import { loadSourcesAction } from '../../store/actions/source.action'
import { sourceSelector } from '../../store/selectors/source.selector'
import { SourceInterface } from '@jbhive/types_fe'


@Component({
    selector: 'ms-source',
    templateUrl: './source.component.html',
    styleUrls: ['./source.component.scss'],
    providers: [SourceStore]
})
export class SourceComponent implements OnInit{
    @Input() source!: SourceInterface | null;

    pending$ = this.sourceStore.pending$       


    constructor(private formBuilder : FormBuilder, private store: Store, private sourceStore: SourceStore) { }

    ngOnInit(): void {
        this.initializeValues()
    }

    initializeValues(): void {
        console.log(this.source)        
    }

    printTagList(){
        if (this.source){
            let res = '['
            for( let tag of this.source.tags) {
                res +=  tag.title + ', '
            }

            res = res.slice(0, -2)
            res += ']'
            return res
        } else {
            return '[]'
        }
        
    }

    isPublicMessage(){
        if (this.source){
            if (this.source.public){
                return 'This source is public'
            } else {
                return 'This source is private'
            }
        }
        return 'Status undefined..'
    }

    hasUrl(){
        if (this.source){
            if (this.source?.url && this.source?.url !== ''){
                return true
            }
        }
        return false
    }

    hasDescription(){
        if (this.source){
            if (this.source?.description && this.source?.description !== ''){
                return true
            }
        }
        return false
    }

    hasContent(){
        if (this.source){
            if (this.source?.content && this.source?.content !== ''){
                return true
            }
        }
        return false
    }

    retrieveHeaderImage(){
        if (this.source){
            // site web
            if (this.source.type.title === 'web'){
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsiy6TH-Vsd_XbJu8MGmdRNYdAZph_oJ379QevPG3O710BXGDNaYf8qBT6hmSFcbXn_8E&usqp=CAU"
            } else if (this.source.type.title === 'book'){
                return "https://previews.123rf.com/images/serhiibrovko/serhiibrovko1709/serhiibrovko170900039/85170783-livre-ouvert-3d-isol%C3%A9-sur-fond-transparent-illustration-vectorielle.jpg"
            } else{
                return "http://greenbookblog.org/wp-content/uploads/2013/12/other-button.jpg"
            }
        }

        return "https://image.shutterstock.com/image-vector/unknown-person-icon-anonymous-pictogram-600w-1391394830.jpg"
    }

}