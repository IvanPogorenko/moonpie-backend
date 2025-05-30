import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ColorModule } from '../color/color.module';
import { SizesModule } from '../sizes/sizes.module';
import { PhotosModule } from '../photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    CategoriesModule,
    ColorModule,
    SizesModule,
    PhotosModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
