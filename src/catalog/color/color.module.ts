import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorModule {}
