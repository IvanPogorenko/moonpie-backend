import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from '../../../catalog/color/entities/color.entity';
import { Repository } from 'typeorm';
import { UpdateColorValueDto } from './dto/update-color-value.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async findAll(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  async findByValue(value: string) {
    return this.colorRepository.findOne({
      where: { value },
    });
  }

  async create(value: string): Promise<Color> {
    const existingColor = this.colorRepository.findOne({
      where: { value },
    });
    if (existingColor) {
      throw new ConflictException('');
    }
    const color = this.colorRepository.create({ value });
    return this.colorRepository.save(color);
  }

  async delete(id: number) {
    const color = await this.colorRepository.findOne({
      where: { id },
    });
    await this.colorRepository.remove(color);
  }

  async updateValue(id: number, updatedColor: UpdateColorValueDto) {
    const color = await this.colorRepository.findOne({
      where: { id },
    });
    if (!color) {
      throw new NotFoundException('');
    }
    color.value = updatedColor.value;
    await this.colorRepository.save(color);
  }
}
