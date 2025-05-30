import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessageDto {
  @ApiProperty({ description: 'Время ошибки' })
  time: string;

  @ApiProperty({ description: 'Текст ошибки' })
  message: string;

  @ApiProperty({ description: 'Код ошибки' })
  code: number;
}
