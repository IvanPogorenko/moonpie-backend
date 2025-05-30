import { ApiProperty } from '@nestjs/swagger';
import { CategoryTreeNodeDto } from './category-tree-node.dto';

export class CategoryTreeDto {
  @ApiProperty({ description: 'Дерево категорий', type: [CategoryTreeNodeDto] })
  data: CategoryTreeNodeDto[];
}
