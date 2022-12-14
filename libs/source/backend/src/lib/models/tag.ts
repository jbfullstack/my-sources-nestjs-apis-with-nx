import { User } from "@jbhive/auth_be";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Tag {
    
    @Field({nullable: true})
    id?: string

    @Field({nullable: true})
    createdAt?: Date

    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    description?: string

    @Field( () => User, {nullable: true})
    author?: User

}