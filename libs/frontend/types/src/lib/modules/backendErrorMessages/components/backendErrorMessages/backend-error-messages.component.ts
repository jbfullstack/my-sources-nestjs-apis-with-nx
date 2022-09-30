import { Component, Input, OnInit } from '@angular/core'
import { BackendErrorsInterface } from '../../../../backend-errors.interface'

@Component({
    selector: 'ms-backend-error-messages',
    templateUrl: './backend-error-messages.component.html',
    styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
    @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface | null
    errorMessages!: string[]

    ngOnInit(): void {
        if (this.backendErrorsProps !== null) {
            this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
                const messages = (this.backendErrorsProps !== null)? this.backendErrorsProps[name].join(', ') : 'no error*'
                return `${name}: ${messages}`
            })
        } else {
            console.error(`BackendErrorMessagesComponent.ngOnInit() called but backendErrorsProps is null`) 
        }
    }
}
