import { ApiProperty } from '@nestjs/swagger';

export class ItemFullInfoDto {
  @ApiProperty({
    description: 'Название товара',
    example: 'М1 Блуза свободного кроя',
  })
  name: string;

  @ApiProperty({
    description: 'Доступные размеры',
    type: [String],
    example: ['42', '44', '46'],
  })
  sizes: string[];

  @ApiProperty({ description: 'Цена товара', example: '3690.00' })
  price: string;

  @ApiProperty({
    description: 'Доступные цвета',
    type: [String],
    example: ['Белый', 'Синий', 'Графит'],
  })
  colors: string[];

  @ApiProperty({
    description: 'URL фотографии товара',
    example: 'https://example.com',
  })
  photoUrl: string;

  @ApiProperty({ description: 'Описание товара', example: 'Описание' })
  description: string;

  @ApiProperty({ description: 'Категория товара', example: 'Блуза' })
  category: string;
}
