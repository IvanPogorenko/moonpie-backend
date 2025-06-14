import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSizeValueDto {
  @ApiProperty({ description: 'Новый размер', example: '56' })
  @IsString({ message: 'Размер должен быть строкой' })
  value: string;
}
