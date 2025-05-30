import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileInfoDto } from './dto/profile-info.dto';
import { ApiPathsEnum } from '../common/enums/api-paths.enum';
import { CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('CRUD Пользователя')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение информации о пользователе' })
  @ApiResponse({
    status: 200,
    description: 'Информация о пользователе',
    type: ProfileInfoDto,
  })
  @Get(ApiPathsEnum.PROFILE_INFO)
  async getProfileInfo(
    @CurrentUserDecorator() userId: number,
  ): Promise<ProfileInfoDto> {
    return this.usersService.getProfileInfo(userId);
  }

  @ApiOperation({ summary: 'Обновление информации пользователя' })
  @ApiResponse({ status: 200, description: 'Информация обновлена' })
  @Patch(ApiPathsEnum.PROFILE_INFO)
  async updateProfileInfo(
    @CurrentUserDecorator() userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    await this.usersService.updateProfile(userId, updateProfileDto);
  }
}
