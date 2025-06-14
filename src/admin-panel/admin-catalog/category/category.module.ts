import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../../catalog/categories/entities/category.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../../../common/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, { provide: APP_GUARD, useClass: RolesGuard }],
  exports: [CategoryService],
})
export class CategoryModule {}
