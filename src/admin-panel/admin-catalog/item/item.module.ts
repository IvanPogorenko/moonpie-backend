import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../../../catalog/item/entities/item.entity';
import { ColorModule } from '../color/color.module';
import { SizeModule } from '../size/size.module';
import { PhotosModule } from '../photos/photos.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    ColorModule,
    SizeModule,
    PhotosModule,
    CategoryModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
