import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'Иван' })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  firstName?: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Иванов' })
  @IsOptional()
  @IsString({ message: 'Фамилия должно быть строкой' })
  lastName?: string;

  @ApiProperty({ description: 'Отчество пользователя', example: 'Иванович' })
  @IsOptional()
  @IsString({ message: 'Отчество должно быть строкой' })
  middleName?: string;

  @ApiProperty({ description: 'email пользователя', example: 'aa@mail.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Некорректный тип email' })
  email?: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '89999999999',
  })
  @IsOptional()
  @IsString({ message: 'Номер телефона должен быть строкой' })
  phoneNumber?: string;
}
