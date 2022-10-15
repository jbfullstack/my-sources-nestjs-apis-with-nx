import { Observable, Subscription } from 'rxjs'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { SourceStore } from '../../store/source.store'
import { deleteSourceAction, loadSourcesAction } from '../../store/actions/source.action'
import { sourceSelector } from '../../store/selectors/source.selector'
import { SourceInterface } from '@jbhive/types_fe'
import { currentUserSelector } from '@jbhive/auth_fe'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
    selector: 'ms-source',
    templateUrl: './source.component.html',
    styleUrls: ['./source.component.scss'],
    providers: [SourceStore]
})
export class SourceComponent implements OnInit{
    @Input() source!: SourceInterface | null;
    @Input() searchParent: string = '';
    
    isOwnedByLoggedUser: boolean = false
    loggedUserId!: number


    pending$ = this.sourceStore.pending$     
    loggedUserId$  = this.sourceStore.loggedUserId$
    showOwned$ = this.sourceStore.showOwned$
    showOwnedPrivate$ = this.sourceStore.showOwnedPrivate$
    showUnowned$ = this.sourceStore.showUnowned$  
    searchInput$ = this.sourceStore.searchInput$


    constructor(private formBuilder : FormBuilder, private store: Store, private sourceStore: SourceStore, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.initializeValues()
        
    }

    initializeValues(): void {
        console.log(this.source)   
        
        this.store.pipe(select(currentUserSelector)).subscribe( {
            next: (user) => {
                if (user) {
                    console.log('user: ', user)
                    this.loggedUserId = user.id
                }             
            }
        })
            
    }

    hasTag(){
        return (this.source && this.source.tags.length > 0)
    }

    printTagList(){
        if (this.source && this.source.tags.length > 0){
            let res = '['
            for( let tag of this.source.tags) {
                res +=  tag.title + ', '
            }

            res = res.slice(0, -2)
            res += ']'
            return res
        } else {
            return ''
        }
        
    }

    title(){
        if (this.source){
            if (this.source.title !== null){
                return this.source.title.toString()
            }
        }

        return ''
    }

    description(){
        if (this.source){
            if (this.source.description !== null){
                return this.source.description
            }
        }

        return ''
    }

    content(){
        if (this.source){
            if (this.source.content !== null){
                return this.source.content
            }
        }

        return ''
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

    print() : string{
        return "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled "
    }

    hasUrl(){
        if (this.source){
            if (this.source?.url && this.source?.url !== ''){
                return true
            }
        }
        return false
    }

    hasTitle(){
        if (this.source){
            if (this.source?.title && this.source?.title !== ''){
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

    isOwnedByLogedUser(){
        if (this.source){
            if (this.source.owner.id === this.loggedUserId){
                return true
            }
        }

        return false
    }

    edit(){
        console.log('TODO: implementer edit source mechanism')
    }

    delete(){
        
            const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
                data:{
                    message: 'Are you sure want to delete?',
                    buttonText: {
                        ok: 'Yes',
                        cancel: 'No'
                    }
                }
            });


            dialogRef.afterClosed().subscribe((confirmed: boolean) => {
                if (confirmed) {
                    if (this.source !== null){
                        this.store.dispatch(deleteSourceAction({id: this.source.id}))
                    }
                } else {
                    console.log('delete source action not confirmed')
                }
            });
        
        
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

    goToUrl(){
        window.open('www.google.fr', "_blank");
    }

}