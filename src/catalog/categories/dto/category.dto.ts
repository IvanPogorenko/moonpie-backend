import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ description: 'Название категории', example: 'Блуза' })
  name: string;
}
