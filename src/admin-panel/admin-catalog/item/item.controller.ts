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
import { ItemService } from './item.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { Item } from '../../../catalog/item/entities/item.entity';
import { AdminPathsEnum } from '../../enum/admin-paths.enum';
import { AvailableOptionsDto } from './dto/available-options.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { AuthorityNameEnum } from '../../../common/enums/authority-name.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('Администрирование Товара')
@Controller('item')
@Roles(AuthorityNameEnum.EMPLOYEE, AuthorityNameEnum.ADMIN)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Получение товара' })
  @ApiResponse({ status: 200, description: 'Товар из БД', type: [Item] })
  @Get(AdminPathsEnum.GET_ITEMS)
  async getAllItems() {
    return this.itemService.getAllItems();
  }

  @ApiOperation({ summary: 'Данные для добавления товара' })
  @ApiResponse({
    status: 200,
    description: 'Цвета, размеры, категории',
    type: AvailableOptionsDto,
  })
  @Get(AdminPathsEnum.GET_DATA_FOR_ITEM)
  async getAvailableData() {
    return this.itemService.getAvailableData();
  }

  @ApiOperation({ summary: 'Добавление нового товара' })
  @ApiResponse({
    status: 200,
    description: 'Товар добавлен',
    type: Item,
  })
  @Post(AdminPathsEnum.CREATE_ITEM)
  async createItem(@Body() newItem: CreateItemDto) {
    return this.itemService.createItem(newItem);
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({
    status: 200,
    description: 'Товар удален',
  })
  @Delete(`${AdminPathsEnum.DELETE_ITEM}/:itemId`)
  async deleteItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemService.deleteItem(itemId);
  }

  @ApiOperation({ summary: 'Обновление товара' })
  @ApiResponse({
    status: 200,
    description: 'Товар обновлен',
  })
  @Put(`${AdminPathsEnum.UPDATE_ITEM}/:itemId`)
  async updateItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updatedItem: UpdateItemDto,
  ) {
    return this.itemService.updateItem(itemId, updatedItem);
  }
}
