import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateSourceTypeInput {
    @Field()
    title: string

    @Field({nullable: true})
    description?: string
}