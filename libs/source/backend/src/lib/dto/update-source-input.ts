import { User } from "@jbhive/auth_be";
import { Field, InputType } from "@nestjs/graphql";
import { SourceType } from "../models/source-type";
import { Tag } from "../models/tag";


@InputType()
export class UpdateSourceInput {
    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    public?: boolean

    @Field({nullable: true})
    url?: string

    @Field({nullable: true})
    content?: string

    @Field({nullable: true})
    description?: string

    @Field({nullable: true})
    typeId?: number

    @Field( type => [Number], {nullable: true})
    tagIds?: number[]
}