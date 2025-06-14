import { Module } from '@nestjs/common';
import { ColorModule } from './color/color.module';
import { SizeModule } from './size/size.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [ColorModule, SizeModule, CategoryModule, ItemModule, PhotosModule],
  exports: [ColorModule, SizeModule, CategoryModule, ItemModule, PhotosModule],
})
export class AdminCatalogModule {}
