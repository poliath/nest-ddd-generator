import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class Update{{ModuleName}}Dto  {
  @ApiProperty({ example: 'en' })
  @IsOptional()
  @IsIn(['en', 'hr'])
  lang: string | null;

  hash?: string | null;
}
