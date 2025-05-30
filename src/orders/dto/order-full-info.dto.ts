import { ApiProperty } from '@nestjs/swagger';
import { ClientContactInfoDto } from './client-contact-info.dto';
import { ItemForCartDto } from '../../cart/dto/item-for-cart.dto';
import { OrderStatusEnum } from '../../common/enums/order-status.enum';

export class OrderFullInfoDto {
  @ApiProperty({ description: 'ID заказа', example: 1 })
  id: number;

  @ApiProperty({ description: 'Данные клиента', type: ClientContactInfoDto })
  clientContacts: ClientContactInfoDto;

  @ApiProperty({ description: 'Статус заказа', enum: OrderStatusEnum })
  orderStatus: OrderStatusEnum;

  @ApiProperty({ description: 'Товары в заказе', type: [ItemForCartDto] })
  items: [ItemForCartDto];

  @ApiProperty({ description: 'Адрес', example: 'ул. Ленина, д. 43, кв. 123' })
  address?: string;

  @ApiProperty({ description: 'Комеентарий', example: 'Комеентарий' })
  comment?: string;

  @ApiProperty({ description: 'Номер телефона', example: '89999999999' })
  phone?: string;

  @ApiProperty({ description: 'Город', example: 'Москва' })
  city?: string;

  @ApiProperty({
    description: 'Имя получателя',
    example: 'Иванов Иван Иванович',
  })
  fullName?: string;

  @ApiProperty({ description: 'Номер заказа в CDEK', example: '43875263487' })
  CDEKNumber?: string;

  @ApiProperty({ description: 'Общая сумма заказа' })
  totalAmount: number;
}
