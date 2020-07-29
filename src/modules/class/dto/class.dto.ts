import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from 'class-validator';

export class ClassDTO {
    @ApiProperty()
    @IsOptional()  
    code: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;
}