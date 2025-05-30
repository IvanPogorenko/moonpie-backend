import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshJwtRequestDto {
  @ApiProperty({
    description: 'Токен для обновления',
    example: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMjUwNj...',
  })
  @IsNotEmpty({ message: 'Токен обновления не должен быть пустым' })
  @IsString({ message: 'Токен для обновления должен быть строкой' })
  refreshToken: string;
}
