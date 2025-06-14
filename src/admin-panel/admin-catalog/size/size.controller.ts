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
import { SizeService } from './size.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminPathsEnum } from '../../enum/admin-paths.enum';
import { Size } from '../../../catalog/sizes/entities/size.entity';
import { UpdateSizeValueDto } from './dto/update-size-value.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { AuthorityNameEnum } from '../../../common/enums/authority-name.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('Администрирование Размеров')
@Controller('size')
@Roles(AuthorityNameEnum.EMPLOYEE, AuthorityNameEnum.ADMIN)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @ApiOperation({ summary: 'Все доступные размеры' })
  @ApiResponse({ status: 200, description: 'Размеры из БД', type: [Size] })
  @Get(AdminPathsEnum.GET_SIZES)
  async getAllSizes() {
    return this.sizeService.findAll();
  }

  @ApiOperation({ summary: 'Добавить размер' })
  @ApiResponse({ status: 200, description: 'Размер добавлен', type: Size })
  @Post(AdminPathsEnum.CREATE_SIZE)
  async createSize(@Body() newSize: string) {
    return this.sizeService.create(newSize);
  }

  @ApiOperation({ summary: 'Удалить размер' })
  @ApiResponse({ status: 200, description: 'Размер удален' })
  @Delete(`${AdminPathsEnum.DELETE_SIZE}/:sizeId`)
  async deleteSize(@Param('sizeId', ParseIntPipe) sizeId: number) {
    return this.sizeService.delete(sizeId);
  }

  @ApiOperation({ summary: 'Обновить размер' })
  @ApiResponse({ status: 200, description: 'Размер обновлен' })
  @Put(`${AdminPathsEnum.UPDATE_SIZE}/:sizeId`)
  async updateSize(
    @Param('sizeId', ParseIntPipe) sizeId: number,
    @Body() updatedValue: UpdateSizeValueDto,
  ) {
    return this.sizeService.updateValue(sizeId, updatedValue);
  }
}
