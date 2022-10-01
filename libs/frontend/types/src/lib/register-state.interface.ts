import { BackendErrorsInterface } from "./backend-errors.interface"

export interface RegisterStateInterface {
    isSubmitting: boolean
    isAccountCreated: boolean | null
    validationErrors: BackendErrorsInterface | null
}