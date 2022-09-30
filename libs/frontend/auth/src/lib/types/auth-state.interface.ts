import { BackendErrorsInterface, CurrentUserInterface } from "@jbhive_fe/types"


export interface AuthStateInterface {
    isSubmitting: boolean
    currentUser: CurrentUserInterface | null
    isLoggedIn: boolean | null // null means not known yet
    validationErrors: BackendErrorsInterface | null

}