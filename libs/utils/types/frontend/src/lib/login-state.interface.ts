import { BackendErrorsInterface } from "./backend-errors.interface"
import { CurrentUserInterface } from "./current-user.interface"


export interface LoginStateInterface {
    isSubmitting: boolean
    currentUser: CurrentUserInterface | null
    isLoggedIn: boolean | null // null means not known yet
    validationErrors: BackendErrorsInterface | null
}