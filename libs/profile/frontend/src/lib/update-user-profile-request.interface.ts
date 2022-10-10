import { EmailValidator } from "@angular/forms"

export interface UpdateUserProfileRequestInterface {
    pseudo?: string
    nickname?: string 
    email?: string
    password?: string
}