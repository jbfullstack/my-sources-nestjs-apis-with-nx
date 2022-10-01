import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuthRegisterInput{

    @Field()
    email: string

    @Field()
    pseudo: string

    @Field()
    nickname: string

    @Field()
    password: string
}