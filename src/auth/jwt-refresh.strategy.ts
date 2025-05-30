import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_REFRESH'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, pl: any) {
    const refreshToken = req.body.refreshToken;
    const user = await this.authService.validateUser(pl);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    return {
      sub: pl.sub,
      email: pl.email,
      refreshToken,
    };
  }
}
