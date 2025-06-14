import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../catalog/categories/entities/category.entity';
import { Color } from '../catalog/color/entities/color.entity';
import { Size } from '../catalog/sizes/entities/size.entity';
import { Item } from '../catalog/item/entities/item.entity';
import { Photo } from '../admin-panel/admin-catalog/photos/entity/photo.entity';
import { SeedService } from './seed.service';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Authority } from '../users/entities/authority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Color,
      Size,
      Item,
      Photo,
      Order,
      OrderItem,
      Authority,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class DatabaseModule {}
