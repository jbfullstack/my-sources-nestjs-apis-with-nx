import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class AdminUpdateUserInput {
    @Field({nullable: true})
    activated?: boolean

    @Field({nullable: true})
    hidden?: boolean

}