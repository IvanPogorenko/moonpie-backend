import { ApiProperty } from '@nestjs/swagger';

export class ProfileInfoDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'Иван' })
  firstName: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Иванов' })
  lastName: string;

  @ApiProperty({ description: 'Отчество пользователя', example: 'Иванович' })
  middleName?: string;

  @ApiProperty({ description: 'email пользователя', example: 'aa@mail.com' })
  email: string;

  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '89999999999',
  })
  phoneNumber?: string;
}
