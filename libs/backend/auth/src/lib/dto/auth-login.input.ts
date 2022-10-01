import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuthLoginInput{

    @Field()
    nickname: string

    @Field()
    password: string
}