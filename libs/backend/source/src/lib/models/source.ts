import { User } from "@jbhive/auth";
import { Field, ObjectType, } from "@nestjs/graphql";
import { SourceType } from "./source-type";
import { Tag } from "./tag";
// import { IsBoolean, IsString, IsEmail, IsDate, IsUrl } from "class-validator";

@ObjectType()
export class Source {
    
    @Field({nullable: true})
    id?: string

    @Field({nullable: true})
    createdAt?: Date

    @Field({nullable: true})
    public?: boolean

    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    url?:string

    @Field({nullable: true})
    description?: string

    @Field( () => SourceType, {nullable: true})
    type?: SourceType

    @Field( () => [Tag], {nullable: true})
    tags?: Tag[]

    @Field( () => User, {nullable: true})
    owner?: User

}