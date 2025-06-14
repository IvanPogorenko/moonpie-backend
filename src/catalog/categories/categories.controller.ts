import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '../../common/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPathsEnum } from '../../common/enums/api-paths.enum';
import { CategoryTreeDto } from './dto/category-tree.dto';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

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
