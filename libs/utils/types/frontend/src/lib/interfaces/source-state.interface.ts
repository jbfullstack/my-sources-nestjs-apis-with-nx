import { BackendErrorsInterface } from "./backend-errors.interface"
import { SourceOptionFilterInterface } from "./source-option-filter.interface"
import { SourceInterface } from "./source.interface"
import { UserInterface } from "./user.interface"


export interface SourceStateInterface {
    pending: boolean
    loggedUserId: number
    sources: SourceInterface[] 
    tagsFilterIds: number[]  // null means not known yet
    searchInput: string
    optionsFilter: SourceOptionFilterInterface
    errors: string
}