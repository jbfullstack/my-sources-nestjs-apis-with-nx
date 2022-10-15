import { BackendErrorsInterface } from "./backend-errors.interface"
import { SourceOptionFilterInterface } from "./source-option-filter.interface"
import { SourceTypeInterface } from "./source-type.interface"
import { SourceInterface } from "./source.interface"
import { TagInterface } from "./tag.interface"
import { UserInterface } from "./user.interface"


export interface SourceStateInterface {
    pending: boolean
    loggedUserId: number
    sources: SourceInterface[] 
    tags: TagInterface[],
    types: SourceTypeInterface[],
    tagsFilterIds: number[]  // null means not known yet
    isAllTagFilterRequired: boolean
    searchInput: string
    optionsFilter: SourceOptionFilterInterface
    errors: string
}