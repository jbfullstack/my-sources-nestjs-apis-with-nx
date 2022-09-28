import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuthRegisterInput{

    @Field()
    email: string

    @Field()
    pseudo: string

    @Field({ nullable: true })
    nickname?: string

    @Field()
    password: string
}