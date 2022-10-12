import { SourceTypeInterface } from "./source-type.interface"
import { TagInterface } from "./tag.interface"

export interface UpdateSourceRequestInterface {
    title?: string,    
    public?: boolean,
    url?: string,
    description?: string,
    content?: string,
    typeId?: number,
    tagsIds?: number[]
}

