import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../../catalog/item/entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CategoryService } from '../category/category.service';
import { ColorService } from '../color/color.service';
import { SizeService } from '../size/size.service';
import { AvailableOptionsDto } from './dto/available-options.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly categoryService: CategoryService,
    private readonly colorService: ColorService,
    private readonly sizeService: SizeService,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: ['colors', 'sizes', 'category'],
    });
  }

  async getAvailableData(): Promise<AvailableOptionsDto> {
    const categories = await this.categoryService.getSubCategories();
    const colors = await this.colorService.findAll();
    const sizes = await this.sizeService.findAll();
    return {
      colors,
      categories,
      sizes,
    };
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const existingItem = await this.itemRepository.findOne({
      where: { name: createItemDto.name },
    });
    if (existingItem) {
      throw new ConflictException('');
    }
    const category = await this.categoryService.findCategoryById(
      createItemDto.categoryId,
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
    if (updateItemDto.categoryId) {
      const category = await this.categoryService.findCategoryById(
        updateItemDto.categoryId,
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
}
