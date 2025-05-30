import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsPositive, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartItemDto {
  @ApiPropertyOptional({
    description: 'Новое количество товара',
    minimum: 1,
    maximum: 99,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Количество должно быть целым числом' })
  @IsPositive({ message: 'Количество должно быть положительным числом' })
  @Min(1, { message: 'Количество не может быть меньше 1' })
  @Max(99, { message: 'Количество не может быть больше 99' })
  quantity?: number;
}
