import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
} from 'class-validator';

export class Create{{ModuleName}}Dto {
  @ApiProperty({ example: 'branch' })
  @IsOptional()
  branch?: string;

  @ApiProperty({ example: 'area' })
  @IsOptional()
  area?: string;
}
