import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateItemDto {
  @ApiProperty({
    description: 'Название товара',
    example: 'М1 Блуза свободного кроя',
  })
  @IsOptional()
  @IsString({ message: 'Название должно быть строкой' })
  name?: string;

  @ApiProperty({ description: 'Артикул товара', example: '5678678675' })
  @IsOptional()
  @IsString({ message: 'Артикул должно быть строкой' })
  article?: string;

  @ApiProperty({
    description: 'Доступные размеры',
    type: [String],
    example: ['42', '44', '46'],
  })
  @IsOptional()
  @IsArray({ message: 'Размеры должны быть массивом' })
  @IsString({ each: true, message: 'Каждый размер - строка' })
  sizes?: string[];

  @ApiProperty({ description: 'Цена товара', example: 3690.0 })
  @IsOptional()
  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsPositive({ message: 'Цена не может быть отрицательной' })
  price?: number;

  @ApiProperty({
    description: 'Доступные цвета',
    type: [String],
    example: ['Белый', 'Синий', 'Графит'],
  })
  @IsOptional()
  @IsArray({ message: 'Цвета должны быть массивом' })
  @IsString({ each: true, message: 'Каждый цвет - строка' })
  colors?: string[];

  @ApiProperty({
    description: 'URL фотографии товара',
    example: 'https://example.com',
  })
  @IsOptional()
  @IsString({ message: 'Фотография должна быть строкой' })
  photoUrl?: string;

  @ApiProperty({ description: 'Описание товара', example: 'Описание' })
  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  description?: string;

  @ApiProperty({ description: 'Категория товара', example: 'Блуза' })
  @IsOptional()
  @IsString({ message: 'Категория должна быть строкой' })
  category?: string;

  @ApiProperty({ description: 'Показывать товар' })
  @IsOptional()
  @IsBoolean({ message: 'Опция - логическое значение' })
  toDisplay?: boolean;
}
