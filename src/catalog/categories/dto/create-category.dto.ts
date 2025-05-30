import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Название категории', example: 'Блуза' })
  @IsNotEmpty({ message: 'Название не должно быть пустым' })
  @IsString({ message: 'Название должно быть строкой' })
  name: string;

  @ApiProperty({
    description: 'Название родительской категории',
    example: 'Блуза',
  })
  @IsOptional()
  @IsString({ message: 'Название родительской категории должно быть строкой' })
  parentCategoryName?: string;
}
