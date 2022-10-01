import { Field, ObjectType } from '@nestjs/graphql'
import { Role } from './role'

@ObjectType()
export class User {

    @Field({ nullable: true })
    id: number

    @Field({ nullable: true })
    email?: string

    @Field({ nullable: true })
    pseudo?: string

    @Field({ nullable: true })
    nickname?: string

    @Field( () => Role, {nullable: true})
    role: Role

    // @Field({ nullable: true }) --> no field bcs password not exposed
    password?: string

    hidden?: boolean

    activated?: boolean

    @Field({ nullable: true })
    token?: string
}
