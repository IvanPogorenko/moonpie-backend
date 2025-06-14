import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ColorService } from '../color/color.service';
import { SizesService } from '../sizes/sizes.service';
import { ItemForCatalogDto } from './dto/item-for-catalog.dto';
import { ItemFullInfoDto } from './dto/item-full-info.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly categoryService: CategoriesService,
    private readonly colorService: ColorService,
    private readonly sizeService: SizesService,
  ) {}

  async getItemsForCatalog(category: string): Promise<ItemForCatalogDto[]> {
    const queryBuilder = this.itemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('item.colors', 'colors')
      .leftJoinAndSelect('item.sizes', 'sizes')
      .leftJoinAndSelect('item.photoUrlList', 'photos')
      .where('item.toDisplay = :toDisplay', { toDisplay: true });
    if (category) {
      queryBuilder.andWhere(
        `
        item.category_id IN (
          WITH RECURSIVE CategoryTree AS (
            SELECT id FROM category WHERE name = :categoryName
            UNION ALL
            SELECT c.id FROM category c
            INNER JOIN CategoryTree ct ON ct.id = c.parent_id
          )
          SELECT id FROM CategoryTree
        )
      `,
        { categoryName: category },
      );
    }
    const items = await queryBuilder.getMany();
    return items.map((item) => ({
      name: item.name,
      sizes: item.sizes.map((size) => size.value),
      price: item.price.toString(),
      colors: item.colors.map((color) => color.value),
      photoUrls: item.photoUrlList.map((photo) => photo.url) || [],
    }));
  }

  async getItemByName(name: string): Promise<ItemFullInfoDto> {
    const item = await this.itemRepository.findOne({
      where: { name },
      relations: ['category', 'colors', 'sizes', 'photoUrlList'],
    });
    if (!item) {
      throw new NotFoundException();
    }
    return {
      name: item.name,
      sizes: item.sizes.map((size) => size.value),
      price: item.price.toString(),
      colors: item.colors.map((color) => color.value),
      photoUrl: item.photoUrlList?.[0]?.url || '',
      description: item.description,
      category: item.category.name,
    };
  }

  async findById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['category', 'colors', 'sizes'],
    });
    if (!item) {
      throw new NotFoundException('');
    }
    return item;
  }

  async findByName(name: string): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { name },
      relations: ['category', 'colors', 'sizes', 'photoUrlList'],
    });
    if (!item) {
      throw new NotFoundException('');
    }
    return item;
  }
}
