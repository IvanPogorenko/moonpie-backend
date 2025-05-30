import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { JwtAuthenticationResponseDto } from './dto/jwt-authentication-response.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private refreshTokens: Map<string, string> = new Map();

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(
    signRequest: SignInRequestDto,
  ): Promise<JwtAuthenticationResponseDto> {
    const user = await this.userService.findByEmail(signRequest.email);
    if (!user || !(await bcrypt.compare(signRequest.password, user.password))) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    this.refreshTokens.set(user.email, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async getAccessToken(
    refreshToken: string,
  ): Promise<JwtAuthenticationResponseDto> {
    try {
      const pl = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
      });
      const user = await this.userService.findByEmail(pl.email);
      const accessToken = this.generateAccessToken(user);
      return {
        accessToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Недействительный рефреш токен');
    }
  }

  async refresh(refreshToken: string): Promise<JwtAuthenticationResponseDto> {
    try {
      const pl = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
      });
      const user = await this.userService.findByEmail(pl.email);
      const accessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);
      this.refreshTokens.set(user.email, newRefreshToken);
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Недействительный рефреш токен');
    }
  }

  async validateUser(pl: any): Promise<User> {
    return this.userService.findById(pl.sub);
  }

  private generateAccessToken(user: User): string {
    const pl = {
      sub: user.id,
      email: user.email,
      authorities: user.authorities.map((auth) => auth.name),
    };
    return this.jwtService.sign(pl, {
      secret: this.configService.get<string>('JWT_SECRET_ACCESS'),
      expiresIn: '15m',
    });
  }

  private generateRefreshToken(user: User): string {
    const pl = {
      sub: user.id,
      email: user.email,
    };
    return this.jwtService.sign(pl, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH'),
      expiresIn: '30d',
    });
  }
}
