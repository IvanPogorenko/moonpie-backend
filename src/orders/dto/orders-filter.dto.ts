import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { OrderStatusEnum } from '../../common/enums/order-status.enum';

export class OrdersFilterDto {
  @ApiProperty({
    description: 'Имя клиента',
    example: 'Иванов Иван Иванович',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  clientName?: string;

  @ApiProperty({
    description: 'Статус заказа',
    enum: OrderStatusEnum,
    example: OrderStatusEnum.IN_PROCESS,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderStatusEnum, { message: 'Некорректный статус заказа' })
  status?: OrderStatusEnum;

  @ApiProperty({
    description: 'Название товара',
    example: 'М1 Блуза',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Название товаара должно быть строкой' })
  itemName?: string;

  @ApiProperty({ description: 'ID Заказа', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'ID заказа должен быть числом' })
  @IsPositive({ message: 'ID заказа должен быть положительным' })
  orderId?: number;
}
