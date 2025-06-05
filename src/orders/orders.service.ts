import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusEnum } from '../common/enums/order-status.enum';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    return await this.dataSource.transaction(async (manager) => {
      const user = await this.usersService.findById(userId);
      const cartItems = await this.cartService.getCartItemsForOrder(userId);
      if (cartItems.length === 0) {
        throw new BadRequestException('Корзина пуста');
      }
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
      const order = this.orderRepository.create({
        client: user,
        orderStatus: OrderStatusEnum.CREATED,
        address: createOrderDto.address,
        city: createOrderDto.city,
        fullName: createOrderDto.fullName,
        phoneNumber: createOrderDto.phoneNumber,
        comment: createOrderDto.comment,
        totalAmount,
      });
      const savedOrder = await manager.save(Order, order);
      for (const cartItem of cartItems) {
        const orderItem = manager.create(OrderItem, {
          order: savedOrder,
          item: cartItem.item,
          color: cartItem.color,
          size: cartItem.size,
          count: cartItem.count,
          price: cartItem.price,
          unitPrice: cartItem.item.price,
          itemName: cartItem.item.name,
          chest: cartItem.chest,
          waist: cartItem.waist,
          hip: cartItem.hip,
        });
        await manager.save(OrderItem, orderItem);
      }
      await this.cartService.clearCart(userId);
      return savedOrder;
    });
  }

  async getOrders(
    userId: number,
    orderStatus?: OrderStatusEnum,
  ): Promise<Order[]> {
    await this.usersService.findById(userId);
    const queryBuilder = this.orderRepository
      .createQueryBuilder('orderEntity')
      .leftJoinAndSelect('orderEntity.client', 'client')
      .leftJoinAndSelect('orderEntity.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.item', 'item')
      .leftJoinAndSelect('orderItems.color', 'color')
      .leftJoinAndSelect('orderItems.size', 'size')
      .leftJoinAndSelect('item.photoUrlList', 'photos')
      .where('orderEntity.client.id = :userId', { userId })
      .orderBy('orderEntity.id', 'DESC');
    if (orderStatus) {
      queryBuilder.andWhere('orderEntity.orderStatus = :orderStatus', {
        orderStatus,
      });
    }
    return await queryBuilder.getMany();
  }

  async getOrderById(orderId: number, userId?: number): Promise<Order> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('orderEntity')
      .leftJoinAndSelect('orderEntity.client', 'client')
      .leftJoinAndSelect('orderEntity.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.item', 'item')
      .leftJoinAndSelect('orderItems.color', 'color')
      .leftJoinAndSelect('orderItems.size', 'size')
      .leftJoinAndSelect('item.photoUrlList', 'photos')
      .where('orderEntity.id = :orderId', { orderId });
    if (userId) {
      queryBuilder.andWhere('orderEntity.client.id = :userId', { userId });
    }
    const order = await queryBuilder.getOne();
    if (!order) {
      throw new NotFoundException('');
    }
    return order;
  }
}
