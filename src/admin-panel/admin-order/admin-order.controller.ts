import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminOrderService } from './admin-order.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { Order } from '../../orders/entities/order.entity';
import { AdminPathsEnum } from '../enum/admin-paths.enum';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthorityNameEnum } from '../../common/enums/authority-name.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Администрирование Заказов')
@Controller('admin-order')
@Roles(AuthorityNameEnum.EMPLOYEE, AuthorityNameEnum.ADMIN)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AdminOrderController {
  constructor(private readonly adminOrderService: AdminOrderService) {}

  @ApiOperation({ description: 'Отображение всех заказов' })
  @ApiResponse({ status: 200, description: 'Все заказы', type: [Order] })
  @Get(AdminPathsEnum.GET_ORDERS)
  async getAllOrders() {
    return this.adminOrderService.getAllOrders();
  }

  @ApiOperation({ description: 'Отображение заказов пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Заказы пользователя',
    type: [Order],
  })
  @Get(`${AdminPathsEnum.GET_USER_ORDERS}/:phoneNumber`)
  async getUserOrders(@Param('phoneNumber') phoneNumber: string) {
    return this.adminOrderService.getOrdersByUser(phoneNumber);
  }

  @ApiOperation({ description: 'Изменение статуса заказа' })
  @ApiResponse({
    status: 200,
    description: 'Статус изменен',
  })
  @Put(`${AdminPathsEnum.UPDATE_ORDERS}/:orderId`)
  async updateOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() newStatus: UpdateOrderDto,
  ) {
    return this.adminOrderService.updateOrderStatus(newStatus, orderId);
  }
}
