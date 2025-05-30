import { ApiProperty } from '@nestjs/swagger';
import { OrdersFilterDto } from './orders-filter.dto';

export class OrderResponseDto {
  @ApiProperty({ description: 'Список заказов', type: [OrdersFilterDto] })
  orders: OrdersFilterDto[];
}
