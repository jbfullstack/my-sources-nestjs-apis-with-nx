import { SourceTypeInterface } from "./source-type.interface"
import { TagInterface } from "./tag.interface"

export interface SourceInterface {
    id: number,
    title: string,    
    createdAt: string,

    public: boolean,
    url: string,
    description: string,

    type: SourceTypeInterface,

    owner: {
        id: number,
        pseudo: string,
    },
    tags: TagInterface[]
}