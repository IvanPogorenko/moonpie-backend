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
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminPathsEnum } from '../../enum/admin-paths.enum';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from '../../../common/decorators/roles.decorator';
import { AuthorityNameEnum } from '../../../common/enums/authority-name.enum';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('Администрирование Категорий')
@Controller('category')
@Roles(AuthorityNameEnum.EMPLOYEE, AuthorityNameEnum.ADMIN)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Создание категории' })
  @ApiResponse({
    status: 200,
    description: 'Категория создана',
  })
  @Post(AdminPathsEnum.CREATE_CATEGORY)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Удаление категории' })
  @ApiResponse({
    status: 200,
    description: 'Категория удалена',
  })
  @Delete(`${AdminPathsEnum.DELETE_CATEGORY}/:categoryId`)
  async deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.delete(categoryId);
  }

  @ApiOperation({ summary: 'Обновление категории' })
  @ApiResponse({
    status: 200,
    description: 'Категория обновлена',
  })
  @Put(`${AdminPathsEnum.UPDATE_CATEGORY}/:categoryId`)
  async updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() updatedCategory: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, updatedCategory);
  }
}
