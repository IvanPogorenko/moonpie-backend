import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from '../../../catalog/sizes/entities/size.entity';
import { UpdateSizeValueDto } from './dto/update-size-value.dto';
@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async findAll(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  async findByValue(value: string) {
    return this.sizeRepository.findOne({
      where: { value },
    });
  }

  async create(value: string): Promise<Size> {
    const existingColor = this.sizeRepository.findOne({
      where: { value },
    });
    if (existingColor) {
      throw new ConflictException('');
    }
    const size = this.sizeRepository.create({ value });
    return this.sizeRepository.save(size);
  }

  async delete(id: number) {
    const size = await this.sizeRepository.findOne({
      where: { id },
    });
    await this.sizeRepository.remove(size);
  }

  async updateValue(id: number, updatedSize: UpdateSizeValueDto) {
    const size = await this.sizeRepository.findOne({
      where: { id },
    });
    if (!size) {
      throw new NotFoundException('');
    }
    size.value = updatedSize.value;
    await this.sizeRepository.save(size);
  }
}
