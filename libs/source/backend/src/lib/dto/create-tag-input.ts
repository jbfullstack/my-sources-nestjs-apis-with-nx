import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateTagInput {
    @Field()
    title: string

    @Field({nullable: true})
    description?: string
}