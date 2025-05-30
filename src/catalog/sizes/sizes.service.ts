import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { Repository } from 'typeorm';
import { Color } from '../color/entities/color.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async findByValue(value: string): Promise<Color> {
    const size = await this.sizeRepository.findOne({
      where: { value },
    });
    if (!size) {
      throw new NotFoundException('');
    }
    return size;
  }

  async findAll(): Promise<Color[]> {
    return this.sizeRepository.find();
  }

  async create(value: string): Promise<Color> {
    const size = this.sizeRepository.create({ value });
    return this.sizeRepository.save(size);
  }
}
