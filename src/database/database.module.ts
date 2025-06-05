import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../catalog/categories/entities/category.entity';
import { Color } from '../catalog/color/entities/color.entity';
import { Size } from '../catalog/sizes/entities/size.entity';
import { Item } from '../catalog/item/entities/item.entity';
import { Photo } from '../catalog/photos/entity/photo.entity';
import { SeedService } from './seed.service';
import { User } from '../users/entities/user.entity';
import { Authority } from '../users/entities/authority.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';

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
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class DatabaseModule {}
