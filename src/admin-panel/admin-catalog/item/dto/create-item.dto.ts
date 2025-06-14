import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'Название товара',
    example: 'М1 Блуза свободного кроя',
  })
  @IsNotEmpty({ message: 'Назваание не может быть пустым' })
  @IsString({ message: 'Название должно быть строкой' })
  name: string;

  @ApiProperty({ description: 'Артикул товара', example: '5678678675' })
  @IsNotEmpty({ message: 'Артикул не может быть пустым' })
  @IsString({ message: 'Артикул должно быть строкой' })
  article: string;

  @ApiProperty({
    description: 'Доступные размеры',
    type: [String],
    example: ['42', '44', '46'],
  })
  @IsArray({ message: 'Размеры должны быть массивом' })
  @IsString({ each: true, message: 'Каждый размер - строка' })
  sizes: string[];

  @ApiProperty({ description: 'Цена товара', example: 3690.0 })
  @IsNotEmpty({ message: 'Цена не может быть пустой' })
  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsPositive({ message: 'Цена не может быть отрицательной' })
  price: number;

  @ApiProperty({
    description: 'Доступные цвета',
    type: [String],
    example: ['Белый', 'Синий', 'Графит'],
  })
  @IsArray({ message: 'Цвета должны быть массивом' })
  @IsString({ each: true, message: 'Каждый цвет - строка' })
  colors: string[];

  @ApiProperty({
    description: 'URL фотографии товара',
    example: 'https://example.com',
  })
  @IsNotEmpty({ message: 'Фотография не может быть пустой' })
  @IsString({ message: 'Фотография должна быть строкой' })
  photoUrl: string;

  @ApiProperty({ description: 'Описание товара', example: 'Описание' })
  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  @IsString({ message: 'Описание должно быть строкой' })
  description: string;

  @ApiProperty({ description: 'ID категории товара', example: 1 })
  @IsNotEmpty({ message: 'Категория не может быть пустой' })
  @IsNumber({}, { message: 'ID категории должен быть числом' })
  categoryId: number;

  @ApiProperty({ description: 'Показывать товар' })
  @IsNotEmpty({ message: 'Опция отображения должна быть выбрана' })
  @IsBoolean({ message: 'Опция - логическое значение' })
  toDisplay: boolean;
}
