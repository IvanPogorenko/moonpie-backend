import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ description: 'Email пользователя' })
  @IsNotEmpty({ message: 'Email не должен быть пустым' })
  @IsEmail({}, { message: 'Неккоректный формат email' })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
  @MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
  password: string;
}
