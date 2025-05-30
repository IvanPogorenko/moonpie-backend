import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryTreeNodeDto } from './dto/category-tree-node.dto';
import { CategoryDto } from './dto/category.dto';
import { CategoryTreeDto } from './dto/category-tree.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findCategoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });
    if (!category) {
      throw new NotFoundException('');
    }
    return category;
  }

  async getUpperCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find({
      where: { parent: null },
    });
    return categories.map((category) => ({
      name: category.name,
    }));
  }

  async getSubCategories(categoryName: string): Promise<CategoryDto[]> {
    const category = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      throw new NotFoundException('');
    }
    return category.children.map((child) => ({
      name: child.name,
    }));
  }

  async getAllCategories(): Promise<CategoryTreeDto> {
    const categories = await this.categoryRepository.find({
      relations: ['children'],
    });
    const rootCategories = categories.filter((category) => !category.parent);
    const categoryTree = this.buildCategoryTree(rootCategories, categories);
    return {
      data: categoryTree,
    };
  }

  private buildCategoryTree(
    rootCategories: Category[],
    allCategories: Category[],
  ): CategoryTreeNodeDto[] {
    return rootCategories.map((root) => ({
      name: root.name,
      children: this.buildCategoryTree(
        allCategories.filter((category) => category.parent?.id === root.id),
        allCategories,
      ),
    }));
  }
}
