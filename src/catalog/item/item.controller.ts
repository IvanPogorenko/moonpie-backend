import { Controller, Get, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { Public } from '../../common/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemFullInfoDto } from './dto/item-full-info.dto';
import { ApiPathsEnum } from '../../common/enums/api-paths.enum';
import { ItemForCatalogDto } from './dto/item-for-catalog.dto';

@ApiTags('Каталог')
@Controller('catalog')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Public()
  @ApiOperation({ summary: 'Получение полной информации о предмете' })
  @ApiResponse({
    status: 200,
    description: 'Полная информация о товаре',
    type: ItemFullInfoDto,
  })
  @Get(ApiPathsEnum.ITEM_BY_NAME)
  async getItemByName(@Query('name') name: string): Promise<ItemFullInfoDto> {
    return this.itemService.getItemByName(name);
  }

  @Public()
  @ApiOperation({ summary: 'Получение предметов по категории' })
  @ApiResponse({
    status: 200,
    description: 'Предметы по категориям',
    type: [ItemForCatalogDto],
  })
  @Get(ApiPathsEnum.ITEMS_BY_CATEGORY)
  async getItems(
    @Query('name') categoryName: string,
  ): Promise<ItemForCatalogDto[]> {
    return this.itemService.getItemsForCatalog(categoryName);
  }
}
