import { ApiProperty } from '@nestjs/swagger';

export class JwtAuthenticationResponseDto {
  @ApiProperty({
    description: 'Токен доступа',
    example: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMjUwNj...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Токен для обновления',
    example: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMjUwNj...',
    required: false,
  })
  refreshToken?: string;
}
