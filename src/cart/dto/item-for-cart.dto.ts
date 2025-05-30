import { ApiProperty } from '@nestjs/swagger';
import { CustomSizeDto } from './custom-size.dto';

export class ItemForCartDto {
  @ApiProperty({ description: 'ID товара', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Название товара',
    example: 'М1 Блуза свободного кроя',
  })
  name: string;

  @ApiProperty({
    description: 'Список фотографий',
    required: false,
    type: [String],
  })
  photoUrlList: string[];

  @ApiProperty({ description: 'Количество', example: 2 })
  count: number;

  @ApiProperty({ description: 'Размер', example: '42' })
  size?: string;

  @ApiProperty({
    description: 'Свой размер',
    required: false,
    type: CustomSizeDto,
  })
  customSize?: CustomSizeDto;

  @ApiProperty({ description: 'Цена за все', example: 3690.0 })
  finalPrice: number;

  @ApiProperty({ description: 'Цвет', example: 'Белый' })
  color: string;
}
