import { Component, Directive, Input, OnInit } from '@angular/core'
import { UserInterface, TagInterface, UsersListStateInterface } from '@jbhive/types_fe'
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store'
import { desactivatedUsersSelector } from '../../store/selectors/admin.selector';
import { AdminService } from '../../services/admin.service';
import { AdminStore } from '../../store/stores/admin.store';
import { activateAction, deleteAction, deleteTagAction, hideAction, updateTagAction } from '../../store/actions/admin.action';
import { FormBuilder, FormGroup } from '@angular/forms';
import { capitalizeFirstLetter } from '../../utils/utils'
// import { AdminStore } from '../../store/stores/admin.store';



@Component({
    selector: 'ms-manage-tag',
    templateUrl: './manage-tag.component.html',
    styleUrls: ['./manage-tag.component.scss'],    
})
export class ManageTagrComponent  implements OnInit {
    @Input() tag!: TagInterface;
    form!: FormGroup

    title!: string
    description!: string

    constructor(private formBuilder : FormBuilder, private store: Store) { }

    ngOnInit() {
        this.title = this.tag.title
        this.description = this.tag.description
    }

    save(){
        if (this.tag?.id) {
            this.store.dispatch(updateTagAction({id: this.tag.id, title: this.title, description: this.description}))
        }
    }

    delete(){
        if (this.tag?.id) {
            this.store.dispatch(deleteTagAction({id: this.tag.id}))
        }
    }

    titleChanged(value: any) {
        console.log('changed !!!: ', value)
    }

    upperFirst(msg: string){
        capitalizeFirstLetter(msg)
    }

    
}