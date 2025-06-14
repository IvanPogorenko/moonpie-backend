import { ApiProperty } from '@nestjs/swagger';
import { Color } from '../../../../catalog/color/entities/color.entity';
import { Category } from '../../../../catalog/categories/entities/category.entity';
import { Size } from '../../../../catalog/sizes/entities/size.entity';

export class AvailableOptionsDto {
  @ApiProperty({ description: 'Доступные цвета' })
  colors: Color[];

  @ApiProperty({ description: 'Доступные цвета' })
  categories: Category[];

  @ApiProperty({ description: 'Доступные цвета' })
  sizes: Size[];
}
