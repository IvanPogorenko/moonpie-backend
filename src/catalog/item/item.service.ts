import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ColorService } from '../color/color.service';
import { SizesService } from '../sizes/sizes.service';
import { ItemForCatalogDto } from './dto/item-for-catalog.dto';
import { ItemFullInfoDto } from './dto/item-full-info.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

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

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const existingItem = await this.itemRepository.findOne({
      where: { name: createItemDto.name },
    });
    if (existingItem) {
      throw new ConflictException('');
    }
    const category = await this.categoryService.findCategoryByName(
      createItemDto.category,
    );
    const colors = await Promise.all(
      createItemDto.colors.map((colorValue) =>
        this.colorService.findByValue(colorValue),
      ),
    );
    const sizes = await Promise.all(
      createItemDto.sizes.map((size) => this.sizeService.findByValue(size)),
    );
    const item = this.itemRepository.create({
      name: createItemDto.name,
      article: createItemDto.article,
      price: createItemDto.price,
      description: createItemDto.description,
      toDisplay: true,
      quantityInStock: 0,
      category,
      colors,
      sizes,
    });
    return this.itemRepository.save(item);
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['category', 'colors', 'sizes'],
    });
    if (!item) {
      throw new NotFoundException('');
    }
    if (updateItemDto.category) {
      const category = await this.categoryService.findCategoryByName(
        updateItemDto.category,
      );
      item.category = category;
    }
    if (updateItemDto.colors && updateItemDto.colors.length > 0) {
      const colors = await Promise.all(
        updateItemDto.colors.map((colorValue) =>
          this.colorService.findByValue(colorValue),
        ),
      );
      item.colors = colors;
    }
    if (updateItemDto.sizes && updateItemDto.sizes.length > 0) {
      const sizes = await Promise.all(
        updateItemDto.sizes.map((sizeValue) =>
          this.sizeService.findByValue(sizeValue),
        ),
      );
      item.sizes = sizes;
    }
    if (updateItemDto.name) {
      item.name = updateItemDto.name;
    }
    if (updateItemDto.article) {
      item.article = updateItemDto.article;
    }
    if (updateItemDto.price) {
      item.price = updateItemDto.price;
    }
    if (updateItemDto.description) {
      item.description = updateItemDto.description;
    }
    if (updateItemDto.toDisplay !== undefined) {
      item.toDisplay = updateItemDto.toDisplay;
    }
    await this.itemRepository.save(item);
  }

  async deleteItem(id: number) {
    const item = await this.itemRepository.findOne({
      where: { id },
    });
    await this.itemRepository.remove(item);
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
