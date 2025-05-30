import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthenticationResponseDto } from './dto/jwt-authentication-response.dto';
import { ApiPathsEnum } from '../common/enums/api-paths.enum';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { RefreshJwtRequestDto } from './dto/refresh-jwt-request.dto';

@ApiTags('Регистрация и авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная авторизация',
    type: JwtAuthenticationResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post(ApiPathsEnum.LOGIN)
  async signIn(
    @Body() signInRequest: SignInRequestDto,
  ): Promise<JwtAuthenticationResponseDto> {
    return this.authService.signIn(signInRequest);
  }

  @ApiOperation({ summary: 'Получение нового токена' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Токен обновлен',
    type: JwtAuthenticationResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post(ApiPathsEnum.TOKEN)
  async getNewAccessToken(
    @Body() request: RefreshJwtRequestDto,
  ): Promise<JwtAuthenticationResponseDto> {
    return this.authService.getAccessToken(request.refreshToken);
  }

  @ApiOperation({ summary: 'Получение нового рефреш токена' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Рефреш токен обновлен',
    type: JwtAuthenticationResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post(ApiPathsEnum.REFRESH)
  async getNewRefreshToken(
    @Body() request: RefreshJwtRequestDto,
  ): Promise<JwtAuthenticationResponseDto> {
    return this.authService.refresh(request.refreshToken);
  }
}
