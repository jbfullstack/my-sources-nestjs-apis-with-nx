import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateUserInput {
    @ApiProperty()
    @Field({nullable: true})
    email?: string

    @ApiProperty()
    @Field({nullable: true})
    pseudo?: string

    @ApiProperty()
    @Field({nullable: true})
    nickname?: string

    @ApiProperty()
    @Field({nullable: true})
    password?: string

}