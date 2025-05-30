import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../common/decorators/public.decorator';
import { ApiPathsEnum } from '../common/enums/api-paths.enum';
import { ClientRegistrationDto } from './dto/client-registration.dto';

@ApiTags('Регистрация')
@Controller()
export class RegistrationController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @ApiOperation({ summary: 'Регистрция клиента' })
  @ApiResponse({ status: 200, description: 'Клиент зарегистрирован' })
  @Post(ApiPathsEnum.CLIENT_SIGNUP)
  async registerClient(@Body() clientRegistrationDro: ClientRegistrationDto) {
    await this.userService.registerClient(clientRegistrationDro);
  }
}
