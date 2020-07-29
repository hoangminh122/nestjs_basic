import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsBoolean } from "class-validator";

export class StudentUpdateDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    studentId: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsOptional()
    dod: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    sex: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    avatarId?: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    active: string;
}