import { SourceTypeInterface } from "./source-type.interface"
import { TagInterface } from "./tag.interface"

export interface CreateSourceRequestInterface {
    title: string,    
    public: boolean,
    url?: string,
    description?: string,
    content?: string,
    typeId: number,
    tagsIds: number[]
}