import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entity/photo.entity';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async create(url: string, item: Item): Promise<Photo> {
    const photo = this.photoRepository.create({ url, item });
    return this.photoRepository.save(photo);
  }

  async findByItemId(itemId: number): Promise<Photo[]> {
    return this.photoRepository.find({
      where: { item: { id: itemId } },
    });
  }

  async delete(id: number) {
    await this.photoRepository.delete(id);
  }
}
