import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';

export class Query{{ModuleName}}Dto {

  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  firstName?: string;
}

export class Filter{{ModuleName}}Dto {
  @ApiProperty()
  @IsString()
  orderBy: keyof {{ModuleName}};

  @ApiProperty()
  @IsString()
  order: string;
}

export class Sort{{ModuleName}}Dto {
  @ApiProperty({
    required: false,
    example: 1,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
    example: 10,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false, example: '{"email":"test2"}' })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(Filter{{ModuleName}}Dto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => Filter{{ModuleName}}Dto)
  filters?: Filter{{ModuleName}}Dto | null;

  @ApiProperty({
    type: String,
    required: false,
    example: '[{"orderBy":"firstName", "order":"ASC"}]',
  })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(Sort{{ModuleName}}Dto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => Sort{{ModuleName}}Dto)
  sort?: Sort{{ModuleName}}Dto[] | null;
}
