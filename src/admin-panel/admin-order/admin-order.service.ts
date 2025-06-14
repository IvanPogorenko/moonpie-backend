import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class AdminOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const queryBuilder = this.orderRepository
      .createQueryBuilder('orderEntity')
      .leftJoinAndSelect('orderEntity.client', 'client')
      .leftJoinAndSelect('orderEntity.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.item', 'item')
      .leftJoinAndSelect('orderItems.color', 'color')
      .leftJoinAndSelect('orderItems.size', 'size')
      .leftJoinAndSelect('item.photoUrlList', 'photos')
      .orderBy('orderEntity.id', 'DESC');
    return await queryBuilder.getMany();
  }

  async getOrdersByUser(phoneNumber: string): Promise<Order[]> {
    const orders = await this.getAllOrders();
    const userOrders = orders.filter(
      (order) =>
        order.client.phone === phoneNumber || order.phoneNumber === phoneNumber,
    );
    if (!userOrders) {
      throw new NotFoundException('');
    }
    return userOrders;
  }

  async updateOrderStatus(newStatus: UpdateOrderDto, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    order.orderStatus = newStatus.status;
    await this.orderRepository.save(order);
  }
}
