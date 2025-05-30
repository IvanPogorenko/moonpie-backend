import { ApiProperty } from '@nestjs/swagger';

export class CategoryTreeNodeDto {
  @ApiProperty({ description: 'Название категории', example: 'Блуза' })
  name: string;

  @ApiProperty({
    description: 'Дочерняя категория',
    type: [CategoryTreeNodeDto],
  })
  children: CategoryTreeNodeDto[];
}
