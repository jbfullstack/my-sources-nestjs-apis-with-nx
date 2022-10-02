import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateUserInput {
    @Field({nullable: true})
    email?: string

    @Field({nullable: true})
    pseudo?: string

    @Field({nullable: true})
    nickname?: string

    @Field({nullable: true})
    password?: string

}