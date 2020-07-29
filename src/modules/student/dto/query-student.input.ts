import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginitionModel } from 'src/shared/models/paginition-model';
import { Type } from 'class-transformer';

export class QueryStudentInput extends PaginitionModel {
  @ApiPropertyOptional()
  @IsOptional()
  // @Type(() => Number)
  @IsString()
  readonly code: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @Type(() => Number)
  @IsString()
  readonly name: string;

  @ApiPropertyOptional()
  @IsOptional()
  // @Type(() => Number)
  @IsString()
  readonly classId: string;

  @ApiPropertyOptional()
  @IsOptional()
  sortBy: string;

  @ApiPropertyOptional()
  @IsOptional()
  sortType: string;
}
