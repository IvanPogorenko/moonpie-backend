import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemForCartDto } from './dto/item-for-cart.dto';
import { CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ApiPathsEnum } from '../common/enums/api-paths.enum';

@ApiTags('Карзина')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Получить корзину пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Содержимое корзины',
    type: [ItemForCartDto],
  })
  @Get(ApiPathsEnum.CART)
  async getCartOfUser(
    @CurrentUserDecorator() userId: number,
  ): Promise<ItemForCartDto[]> {
    return this.cartService.getCartItemsByUserId(userId);
  }

  @ApiOperation({ summary: 'Добавить товар в корзину' })
  @ApiResponse({ status: 201, description: 'Товар добавлен в корзину' })
  @Post(ApiPathsEnum.CART)
  async addItemToCart(
    @CurrentUserDecorator() userId: number,
    @Body() addCartItemDto: AddCartItemDto,
  ): Promise<void> {
    await this.cartService.addItemToCart(userId, addCartItemDto);
  }

  @ApiOperation({ summary: 'Обновить количество товара в корзине' })
  @ApiResponse({ status: 200, description: 'Количество товара обновлено' })
  @Put(`${ApiPathsEnum.CART}/:cartItemId`)
  async updateCartItem(
    @CurrentUserDecorator() userId: number,
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ): Promise<void> {
    await this.cartService.updateCartItem(
      userId,
      cartItemId,
      updateCartItemDto,
    );
  }

  @ApiOperation({ summary: 'Удалить товар из корзины' })
  @ApiResponse({ status: 200, description: 'Товар удален из корзины' })
  @Delete(`${ApiPathsEnum.CART}/:cartItemId`)
  async removeItemFromCart(
    @CurrentUserDecorator() userId: number,
    @Param('cartItemId', ParseIntPipe) cartItemId: number,
  ): Promise<void> {
    await this.cartService.removeItemFromCart(userId, cartItemId);
  }

  @ApiOperation({ summary: 'Очистить корзину' })
  @ApiResponse({ status: 200, description: 'Корзина очищена' })
  @Delete(ApiPathsEnum.CART)
  async clearCart(@CurrentUserDecorator() userId: number): Promise<void> {
    await this.cartService.clearCart(userId);
  }

  @ApiOperation({ summary: 'Получить количество товаров в корзине' })
  @ApiResponse({
    status: 200,
    description: 'Количество товаров в корзине',
    schema: { type: 'object', properties: { count: { type: 'number' } } },
  })
  @Get(`${ApiPathsEnum.CART}/count`)
  async getCartItemsCount(
    @CurrentUserDecorator() userId: number,
  ): Promise<{ count: number }> {
    const count = await this.cartService.getCartItemsCount(userId);
    return { count };
  }
}
