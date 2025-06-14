import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ItemModule } from './item/item.module';
import { ColorModule } from './color/color.module';
import { SizesModule } from './sizes/sizes.module';
import { PhotosModule } from '../admin-panel/admin-catalog/photos/photos.module';

@Module({
  imports: [
    CategoriesModule,
    ItemModule,
    ColorModule,
    SizesModule,
    PhotosModule,
  ],
  exports: [
    CategoriesModule,
    ItemModule,
    ColorModule,
    SizesModule,
    PhotosModule,
  ],
})
export class CatalogModule {}
