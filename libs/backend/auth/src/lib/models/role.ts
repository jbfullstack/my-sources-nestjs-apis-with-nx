import { User } from '@jbhive/auth'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Role {

    @Field({ nullable: true })
    id: number

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    description?: string
}
