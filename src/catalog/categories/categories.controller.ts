import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '../../common/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { ApiPathsEnum } from '../../common/enums/api-paths.enum';
import { CategoryTreeDto } from './dto/category-tree.dto';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @ApiOperation({ summary: 'Получение категорий верхнего уровня' })
  @ApiResponse({
    status: 200,
    description: 'Категории верхнего уровня',
    type: [CategoryDto],
  })
  @Get(ApiPathsEnum.CATEGORY_UPPER)
  async getUpperCategories(): Promise<CategoryDto[]> {
    return this.categoriesService.getUpperCategories();
  }

  @Public()
  @ApiOperation({ summary: 'Получение подкатегорий' })
  @ApiResponse({
    status: 200,
    description: 'Подкатегории',
    type: [CategoryDto],
  })
  @Get(ApiPathsEnum.SUBCATEGORY)
  async getSubCategories(
    @Query('name') categoryName: string,
  ): Promise<CategoryDto[]> {
    return this.categoriesService.getSubCategories(categoryName);
  }

  @Public()
  @ApiOperation({ summary: 'Получение всех категорий' })
  @ApiResponse({
    status: 200,
    description: 'Все категории',
    type: CategoryTreeDto,
  })
  @Get(ApiPathsEnum.CATEGORY)
  async getAllCategories(): Promise<CategoryTreeDto> {
    return this.categoriesService.getAllCategories();
  }
}
