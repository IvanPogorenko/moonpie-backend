import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { ItemService } from '../catalog/item/item.service';
import { UsersService } from '../users/users.service';
import { SizesService } from '../catalog/sizes/sizes.service';
import { ColorService } from '../catalog/color/color.service';
import { ItemForCartDto } from './dto/item-for-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { CustomSizeDto } from './dto/custom-size.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly itemService: ItemService,
    private readonly colorService: ColorService,
    private readonly sizesService: SizesService,
    private readonly usersService: UsersService,
  ) {}

  async getCartItemsByUserId(userId: number): Promise<ItemForCartDto[]> {
    await this.usersService.findById(userId);
    const cartItems = await this.cartItemRepository.find({
      where: { user: { id: userId } },
      relations: ['item', 'item.photoUrlList', 'color', 'size'],
    });
    return cartItems.map((cartItem) => this.mapToItemForCartDto(cartItem));
  }

  async addItemToCart(
    userId: number,
    addCartItemDto: AddCartItemDto,
  ): Promise<void> {
    const user = await this.usersService.findById(userId);
    const item = await this.itemService.findByName(addCartItemDto.name);
    const color = await this.colorService.findByValue(addCartItemDto.color);
    const isColorAvailable = item.colors.some(
      (itemColor) => itemColor.id === color.id,
    );
    if (!isColorAvailable) {
      throw new BadRequestException(
        'Выбранный цвет недоступен для этого товара',
      );
    }
    let size = null;
    let customSize = null;
    if (addCartItemDto.size) {
      size = await this.sizesService.findByValue(addCartItemDto.size);
      const isSizeAvailable = item.sizes.some(
        (itemSize) => itemSize.id === size.id,
      );
      if (!isSizeAvailable) {
        throw new BadRequestException(
          'Выбранный размер недоступен для этого товара',
        );
      }
    } else if (addCartItemDto.customSize) {
      customSize = addCartItemDto.customSize;
      this.validateCustomSize(customSize);
    } else {
      throw new BadRequestException(
        'Необходимо указать размер или свои парметры',
      );
    }
    const existingCartItem = await this.cartItemRepository.findOne({
      where: {
        user: { id: userId },
        item: { id: item.id },
        color: { id: color.id },
        size: size ? { id: size.id } : null,
        chest: customSize?.chest || null,
        waist: customSize?.waist || null,
        hip: customSize?.hip || null,
      },
    });
    if (existingCartItem) {
      const newQuantity = existingCartItem.count + addCartItemDto.quantity;
      existingCartItem.count = newQuantity;
      existingCartItem.price = item.price * newQuantity;
      await this.cartItemRepository.save(existingCartItem);
    } else {
      const cartItem = this.cartItemRepository.create({
        user,
        item,
        color,
        size,
        count: addCartItemDto.quantity,
        price: item.price * addCartItemDto.quantity,
        chest: customSize?.chest || null,
        waist: customSize?.waist || null,
        hip: customSize?.hip || null,
      });
      await this.cartItemRepository.save(cartItem);
    }
  }

  async updateCartItem(
    userId: number,
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ): Promise<void> {
    const cartItem = await this.findCartItemByIdAndUserId(cartItemId, userId);
    if (updateCartItemDto.quantity !== undefined) {
      if (updateCartItemDto.quantity <= 0) {
        throw new BadRequestException('Количество должно быть больше 0');
      }
      cartItem.count = updateCartItemDto.quantity;
      cartItem.price = cartItem.item.price * updateCartItemDto.quantity;
    }
    await this.cartItemRepository.save(cartItem);
  }

  async removeItemFromCart(userId: number, cartItemId: number): Promise<void> {
    const cartItem = await this.findCartItemByIdAndUserId(cartItemId, userId);
    await this.cartItemRepository.remove(cartItem);
  }

  async clearCart(userId: number): Promise<void> {
    await this.usersService.findById(userId);
    await this.cartItemRepository.delete({ user: { id: userId } });
  }

  async getCartItemsCount(userId: number): Promise<number> {
    await this.usersService.findById(userId);
    const result = await this.cartItemRepository
      .createQueryBuilder('cartItem')
      .select('SUM(cartItem.count)', 'total')
      .where('cartItem.user.id = :userId', { userId })
      .getRawOne();
    return parseInt(result.total) || 0;
  }

  async getCartItemsForOrder(userId: number): Promise<CartItem[]> {
    return this.cartItemRepository.find({
      where: { user: { id: userId } },
      relations: ['item', 'color', 'size'],
    });
  }

  private async findCartItemByIdAndUserId(
    cartItemId: number,
    userId: number,
  ): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId, user: { id: userId } },
      relations: ['item', 'color', 'size'],
    });
    if (!cartItem) {
      throw new NotFoundException('Товар в корзине не найден');
    }
    return cartItem;
  }

  private mapToItemForCartDto(cartItem: CartItem): ItemForCartDto {
    const customSize =
      cartItem.chest || cartItem.waist || cartItem.hip
        ? {
            chest: cartItem.chest,
            waist: cartItem.waist,
            hip: cartItem.hip,
          }
        : null;
    return {
      id: cartItem.id,
      name: cartItem.item.name,
      photoUrlList: cartItem.item.photoUrlList?.map((photo) => photo.url) || [],
      count: cartItem.count,
      size: cartItem.size?.value || null,
      customSize,
      color: cartItem.color.value,
      finalPrice: cartItem.price,
    };
  }

  private validateCustomSize(customSize: CustomSizeDto): void {
    if (!customSize.chest || !customSize.waist || !customSize.hip) {
      throw new BadRequestException('Необходимо указать все параметры');
    }
    const validateMeasurement = (value: number, name: string) => {
      if (value !== undefined && value !== null) {
        if (value <= 0 || value > 200) {
          throw new BadRequestException(
            `${name} должен быть в диапазоне от 1 до 200 см`,
          );
        }
      }
    };
    validateMeasurement(customSize.chest, 'Обхват груди');
    validateMeasurement(customSize.waist, 'Обхват талии');
    validateMeasurement(customSize.hip, 'Обхват бедер');
  }
}
