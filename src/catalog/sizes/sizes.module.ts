import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  providers: [SizesService],
  exports: [SizesService],
})
export class SizesModule {}
