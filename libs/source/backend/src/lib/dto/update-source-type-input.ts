import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateSourceTypeInput {
    @Field({nullable: true})
    title?: string

    @Field({nullable: true})
    description?: string
}