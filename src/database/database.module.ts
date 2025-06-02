import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../catalog/categories/entities/category.entity';
import { Color } from '../catalog/color/entities/color.entity';
import { Size } from '../catalog/sizes/entities/size.entity';
import { Item } from '../catalog/item/entities/item.entity';
import { Photo } from '../catalog/photos/entity/photo.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Color, Size, Item, Photo])],
  providers: [SeedService],
  exports: [SeedService],
})
export class DatabaseModule {}
