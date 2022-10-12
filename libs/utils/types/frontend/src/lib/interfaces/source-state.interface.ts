import { BackendErrorsInterface } from "./backend-errors.interface"
import { SourceInterface } from "./source.interface"
import { UserInterface } from "./user.interface"


export interface SourceStateInterface {
    pending: boolean
    sources: SourceInterface[] 
    tagsFilterIds: number[]  // null means not known yet
    searchInput: string
    errors: string
}