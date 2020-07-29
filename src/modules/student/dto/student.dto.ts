import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
export enum GENDER {
    'F',
    'M'
  }
export class StudentDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    code: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    classId: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiPropertyOptional()
    @IsOptional()
    dateOfBirth: Date;

    @ApiPropertyOptional()
    // @ApiProperty({enum: [ GENDER.F, GENDER.M] })
    @IsOptional()
    @IsString()
    gender: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    avatarId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    active: string;
}