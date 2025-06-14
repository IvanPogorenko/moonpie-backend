import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateColorValueDto {
  @ApiProperty({ description: 'Новый цвет', example: 'Зеленый' })
  @IsString({ message: 'Название должно быть строкой' })
  value: string;
}
