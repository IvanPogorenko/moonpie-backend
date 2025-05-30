import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async findByValue(value: string): Promise<Color> {
    const color = await this.colorRepository.findOne({
      where: { value },
    });
    if (!color) {
      throw new NotFoundException('');
    }
    return color;
  }

  async findAll(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  async create(value: string): Promise<Color> {
    const color = this.colorRepository.create({ value });
    return this.colorRepository.save(color);
  }
}
