import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Название категории', example: 'Блуза' })
  @IsNotEmpty({ message: 'Название не должно быть пустым' })
  @IsString({ message: 'Название должно быть строкой' })
  name: string;

  @ApiProperty({
    description: 'ID родительской категории',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'ID должен быть числом' })
  parentCategoryID?: number;
}
