import { BackendErrorsInterface } from "./backend-errors.interface"
import { UserInterface } from "./user.interface"


export interface LoginStateInterface {
    isSubmitting: boolean
    currentUser: UserInterface | null
    isLoggedIn: boolean | null // null means not known yet
    validationErrors: BackendErrorsInterface | null
}