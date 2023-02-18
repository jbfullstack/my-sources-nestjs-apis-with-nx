import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatedUserDto {

    @Field({nullable: false})
    email?: string

    @Field({nullable: false})
    password?: string

    @Field({nullable: false})
    pseudo?: string

    @Field({nullable: false})
    roleId?: number

    @Field({nullable: false})
    nickname?: string

}