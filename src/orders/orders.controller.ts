import {
  Body,
  Controller,
  Get,
  ParseEnumPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiPathsEnum } from '../common/enums/api-paths.enum';
import { CurrentUserDecorator } from '../common/decorators/current-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatusEnum } from '../common/enums/order-status.enum';
import { Order } from './entities/order.entity';

@ApiTags('Заказы')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Создать заказ пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Заказ создан',
  })
  @Post(ApiPathsEnum.ORDER)
  async createOrder(
    @CurrentUserDecorator() userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  @ApiOperation({ summary: 'Получение заказов' })
  @ApiQuery({
    name: 'status',
    enum: OrderStatusEnum,
    required: false,
    description: 'Фильтр по статусу заказа',
  })
  @ApiResponse({
    status: 200,
    description: 'Список заказов пользователя',
    type: [Order],
  })
  @Get(ApiPathsEnum.ORDER)
  async getOrders(
    @CurrentUserDecorator() userId: number,
    @Query('status', new ParseEnumPipe(OrderStatusEnum, { optional: true }))
    orderStatus?: OrderStatusEnum,
  ): Promise<Order[]> {
    return this.ordersService.getOrders(userId, orderStatus);
  }

  @ApiOperation({ summary: 'Получить конкретный заказ' })
  @ApiResponse({
    status: 200,
    description: 'Детали заказа',
    type: Order,
  })
  @Get(`${ApiPathsEnum.ORDER}/:orderId`)
  async getOrderById(
    @CurrentUserDecorator() userId: number,
    @Query('orderId') orderId: number,
  ): Promise<Order> {
    return this.ordersService.getOrderById(orderId, userId);
  }
}
