import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateTagInput {
    @Field()
    title?: string

    @Field({nullable: true})
    description?: string
}