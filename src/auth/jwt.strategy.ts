import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_ACCESS'),
    });
  }

  async validate(pl: any) {
    const user = await this.authService.validateUser(pl);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    return {
      sub: pl.sub,
      email: pl.email,
      authorities: pl.authorities,
    };
  }
}
