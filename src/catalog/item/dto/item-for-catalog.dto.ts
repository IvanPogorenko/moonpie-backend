import { ApiProperty } from '@nestjs/swagger';

export class ItemForCatalogDto {
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

  @ApiProperty({ description: 'URL фотографий', type: [String] })
  photoUrls: string[];
}
