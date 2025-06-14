import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Новое название категории',
    example: 'Рубашки',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Название должно быть строкой' })
  name?: string;

  @ApiProperty({
    description: 'Родительская категория (null для корневой категории)',
    example: 1,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsNumber({}, { message: 'ID родительской категории должен быть числом' })
  parentId?: number | null;
}
