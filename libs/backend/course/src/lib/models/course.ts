import { User } from "@jbhive/auth";
import { Field, ObjectType } from "@nestjs/graphql";
import { Lesson } from "./lesson";

@ObjectType()
export class Course {

    @Field({nullable: true})
    id?: string
    
    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    description?: string

    @Field({nullable: true})
    imageUrl?: string

    @Field( () => [Lesson], {nullable: true})
    lessons?: Lesson[]

    @Field( () => User, {nullable: true})
    author?: User
}