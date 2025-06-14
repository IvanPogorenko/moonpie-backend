import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../../../common/enums/order-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Новый статус заказа',
    enum: OrderStatusEnum,
    example: OrderStatusEnum.IN_PROCESS,
  })
  @IsEnum(OrderStatusEnum, { message: 'Некорректный статус заказа' })
  status: OrderStatusEnum;
}
