import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { Public } from '../../../common/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Color } from '../../../catalog/color/entities/color.entity';
import { AdminPathsEnum } from '../../enum/admin-paths.enum';
import { UpdateColorValueDto } from './dto/update-color-value.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { AuthorityNameEnum } from '../../../common/enums/authority-name.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('Администрирование Цветов')
@Controller('color')
@Roles(AuthorityNameEnum.EMPLOYEE, AuthorityNameEnum.ADMIN)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @ApiOperation({ summary: 'Получение всех цветов' })
  @ApiResponse({ status: 200, description: 'Цвета в БД', type: Color })
  @Get(AdminPathsEnum.GET_COLORS)
  async getAllColors() {
    return this.colorService.findAll();
  }

  @ApiOperation({ summary: 'Добавление нового цвета' })
  @ApiResponse({ status: 200, description: 'Цвет добавлен', type: Color })
  @Post(AdminPathsEnum.CREATE_COLOR)
  async createColor(@Body() newColor: string) {
    return this.colorService.create(newColor);
  }

  @ApiOperation({ summary: 'Удаление цвета' })
  @ApiResponse({ status: 200, description: 'Цвет удален' })
  @Delete(`${AdminPathsEnum.DELETE_COLOR}/:colorId`)
  async deleteColor(@Param('colorId', ParseIntPipe) colorId: number) {
    return this.colorService.delete(colorId);
  }

  @ApiOperation({ summary: 'Обновление цвета' })
  @ApiResponse({ status: 200, description: 'Цвет обновлен' })
  @Put(`${AdminPathsEnum.UPDATE_COLOR}/:colorId`)
  async updateColor(
    @Param('colorId', ParseIntPipe) colorId: number,
    @Body() newColor: UpdateColorValueDto,
  ) {
    return this.colorService.updateValue(colorId, newColor);
  }
}
