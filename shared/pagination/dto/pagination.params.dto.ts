import { IsNumber, IsNotEmpty, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationParamsDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: 'number',
    description: 'Número da página',
    required: true,
    example: 1,
  })
  page: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5000)
  @ApiProperty({
    type: 'number',
    description: 'Número de itens por página',
    required: true,
    example: 20,
  })
  itemsPerPage: number;
}
