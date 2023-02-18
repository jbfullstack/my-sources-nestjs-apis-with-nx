import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatedRoleDto {
    @Field({nullable: false})
    id?: number

    @Field({nullable: false})
    name?: string

    @Field({nullable: false})
    description?: string

}