import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CustomSizeDto } from './custom-size.dto';

export class AddCartItemDto {
  @ApiProperty({
    description: 'Название товара',
    example: 'М1 Блуза свободного кроя',
  })
  @IsNotEmpty({ message: 'Назваание не может быть пустым' })
  @IsString({ message: 'Название должно быть строкой' })
  name: string;

  @ApiProperty({ description: 'Размер', example: '42' })
  @IsOptional()
  @IsString({ each: true, message: 'Каждый размер - строка' })
  size?: string;

  @ApiProperty({
    description: 'Свой размер',
    required: false,
    type: CustomSizeDto,
  })
  @IsOptional()
  @ValidateNested()
  customSize?: CustomSizeDto;

  @ApiProperty({ description: 'Цвета', example: 'Белый' })
  @IsNotEmpty({ message: 'Цвет нужно выбрать' })
  @IsString({ message: 'Цвет должен быть строкой' })
  color: string;

  @ApiProperty({ description: 'Количество', example: 2 })
  @IsNotEmpty({ message: 'Количество не может быть пустым' })
  @IsNumber({}, { message: 'Количество должно быть числом' })
  @IsPositive({ message: 'Количество должно быть положительным' })
  quantity: number;
}
