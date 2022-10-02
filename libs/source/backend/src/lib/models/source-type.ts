import { User } from "@jbhive/auth_be";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SourceType {
    
    @Field({nullable: true})
    id?: string

    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    description?: string
}