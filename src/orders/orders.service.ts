import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusEnum } from '../common/enums/order-status.enum';
import { OrderFullInfoDto } from './dto/order-full-info.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
    private readonly usersService: UsersService,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findById(userId);
    const cartItems = await this.cartService.getCartItemsForOrder(userId);
    if (cartItems.length === 0) {
      throw new BadRequestException('Корзина пуста');
    }
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
    const order = this.orderRepository.create({
      client: user,
      orderStatus: OrderStatusEnum.CREATED,
      cartItems,
      address: createOrderDto.address,
      city: createOrderDto.city,
      fullName: createOrderDto.fullName,
      phoneNumber: createOrderDto.phoneNumber,
      comment: createOrderDto.comment,
      totalAmount,
    });
    await this.orderRepository.save(order);
    await this.cartService.clearCart(userId);
  }

  async getOrders(
    userId: number,
    orderStatus?: OrderStatusEnum,
  ): Promise<Order[]> {
    await this.usersService.findById(userId);
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.cartItems', 'cartItems')
      .leftJoinAndSelect('cartItems.item', 'item')
      .leftJoinAndSelect('cartItems.color', 'color')
      .leftJoinAndSelect('cartItems.size', 'size')
      .leftJoinAndSelect('item.photoUrlList', 'photos')
      .where('order.user.id = :userId', { userId })
      .orderBy('order.createdAt', 'DESC');
    if (orderStatus) {
      queryBuilder.andWhere('order.orderStatus = :orderStatus', {
        orderStatus,
      });
    }
    return await queryBuilder.getMany();
  }

  async getOrderById(orderId: number, userId?: number): Promise<Order> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.cartItems', 'cartItems')
      .leftJoinAndSelect('cartItems.item', 'item')
      .leftJoinAndSelect('cartItems.color', 'color')
      .leftJoinAndSelect('cartItems.size', 'size')
      .leftJoinAndSelect('item.photoUrlList', 'photos')
      .where('order.id = :orderId', { orderId });
    if (userId) {
      queryBuilder.andWhere('order.user.id = :userId', { userId });
    }
    const order = await queryBuilder.getOne();
    if (!order) {
      throw new NotFoundException('');
    }
    return order;
  }
}
