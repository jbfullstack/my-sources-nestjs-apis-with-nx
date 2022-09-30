import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BackendErrorMessagesComponent } from './components/backendErrorMessages/backend-error-messages.component'

@NgModule({
    imports: [CommonModule],
    declarations: [BackendErrorMessagesComponent],
    exports: [BackendErrorMessagesComponent]
})

export class BackendErrorMessagesModule{

}