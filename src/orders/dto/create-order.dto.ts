import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ФИО получателя',
    example: 'Иванов Иван Иванович',
  })
  @IsNotEmpty({ message: 'ФИО не может быть пустым' })
  @IsString({ message: 'ФИО должно быть строкой' })
  fullName: string;

  @ApiProperty({ description: 'Город доставки', example: 'Москва' })
  @IsNotEmpty({ message: 'Город не может быть пустым' })
  @IsString({ message: 'Город должен быть строкой' })
  city: string;

  @ApiProperty({ description: 'Телефон получателя', example: '89999999999' })
  @IsNotEmpty({ message: 'Телефон не может быть пустым' })
  @IsString({ message: 'Телефон должен быть строкой' })
  phoneNumber: string;

  @ApiProperty({ description: 'Комментарий', example: 'Комментарий' })
  @IsOptional()
  @IsString({ message: 'Комментарий должен быть строкой' })
  comment?: string;

  @ApiProperty({
    description: 'Адрес доставки',
    example: 'ул. Ленина, д.45, кв. 156',
  })
  @IsNotEmpty({ message: 'Адрес не может быть пустым' })
  @IsString({ message: 'Адрес должен быть строкой' })
  address: string;
}
