import { ApiProperty } from '@nestjs/swagger';

export class ClientContactInfoDto {
  @ApiProperty({ description: 'Имя', example: 'Иванов Иван Иванович' })
  name: string;

  @ApiProperty({ description: 'Email', example: 'aa@mail.ru' })
  email: string;

  @ApiProperty({ description: 'Телефон', example: '89999999999' })
  phone: string;
}
