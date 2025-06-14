import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../catalog/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Item } from '../../../catalog/item/entities/item.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Категория с ID ${id} не найдена`);
    }
    return category;
  }

  async getSubCategories(): Promise<Category[]> {
    const category = await this.categoryRepository.find({
      relations: ['children'],
    });
    const categories = category.filter((cat) => cat.children.length === 0);
    if (!categories) {
      throw new NotFoundException(`Категории не найдены`);
    }
    return categories;
  }

  async create(createdCategory: CreateCategoryDto) {
    const category = await this.categoryRepository.create({
      name: createdCategory.name,
    });
    if (createdCategory.parentCategoryID) {
      try {
        const parentCategory = await this.categoryRepository.findOne({
          where: { id: createdCategory.parentCategoryID },
        });
        category.parent = parentCategory;
      } catch (err) {
        throw new NotFoundException('');
      }
    }
    return await this.categoryRepository.save(category);
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'children', 'items'],
    });
    const isRootCategory = !category.parent;
    if (isRootCategory && category.items && category.items.length > 0) {
      throw new BadRequestException('У данной категории есть товары');
    }
    await this.categoryRepository.manager.transaction(async (manager) => {
      if (category.children && category.children.length > 0) {
        if (isRootCategory) {
          for (const child of category.children) {
            child.parent = null;
            await manager.save(Category, child);
          }
        } else {
          for (const child of category.children) {
            child.parent = category.parent;
            await manager.save(Category, child);
          }
        }
      }
      if (category.items && category.items.length > 0) {
        for (const item of category.items) {
          item.category = category.parent;
          await manager.save(Item, item);
        }
      }
      await manager.remove(Category, category);
    });
  }

  async updateCategory(id: number, updatedCategory: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
    await this.categoryRepository.manager.transaction(async (manager) => {
      if (updatedCategory.name) {
        category.name = updatedCategory.name;
      }
      if (updatedCategory.parentId) {
        if (updatedCategory.parentId === null) {
          category.parent = null;
        } else {
          const newParent = await this.categoryRepository.findOne({
            where: { id: updatedCategory.parentId },
          });
          category.parent = newParent;
        }
      }
      await manager.save(Category, category);
    });
  }
}
