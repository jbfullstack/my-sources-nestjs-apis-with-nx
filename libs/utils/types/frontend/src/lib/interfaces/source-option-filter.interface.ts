import { BackendErrorsInterface } from "./backend-errors.interface"
import { SourceInterface } from "./source.interface"
import { UserInterface } from "./user.interface"


export interface SourceOptionFilterInterface {
    showOwned:          boolean
    showOwnedPrivate:   boolean
    showUnowned:        boolean
}