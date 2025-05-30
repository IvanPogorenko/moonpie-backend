import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class ClientRegistrationDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'Иван' })
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  @IsString({ message: 'Имя должно быть строкой' })
  firstName: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Иванов' })
  @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
  @IsString({ message: 'Фамилия должно быть строкой' })
  lastName: string;

  @ApiProperty({ description: 'Отчество пользователя', example: 'Иванович' })
  @IsOptional()
  @IsString({ message: 'Отчество должно быть строкой' })
  middleName?: string;

  @ApiProperty({ description: 'email пользователя', example: 'aa@mail.com' })
  @IsNotEmpty({ message: 'email не может быть пустым' })
  @IsEmail({}, { message: 'Некорректный тип email' })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'qwert1234' })
  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(6, { message: 'Минимальная длина пароля - 6' })
  password: string;
}
