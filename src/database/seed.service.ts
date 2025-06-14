import { Injectable, type OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Category } from '../catalog/categories/entities/category.entity';
import { Color } from '../catalog/color/entities/color.entity';
import { Size } from '../catalog/sizes/entities/size.entity';
import { Item } from '../catalog/item/entities/item.entity';
import { Photo } from '../admin-panel/admin-catalog/photos/entity/photo.entity';
import * as console from 'console';
import { Authority } from '../users/entities/authority.entity';
import { AuthorityNameEnum } from '../common/enums/authority-name.enum';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Authority)
    private authorityRepository: Repository<Authority>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const categoryCount = await this.categoryRepository.count();
    if (categoryCount > 0) {
      return;
    }
    try {
      await this.seedCategories();
      await this.seedColors();
      await this.seedSizes();
      await this.seedItems();
      await this.seedAuthority();
      console.log('База данных успешно заполнена начальными данными');
    } catch (error) {
      console.error('Ошибка при заполнении базы данных:', error);
    }
  }

  private async seedAuthority() {
    const authorities = [
      { name: AuthorityNameEnum.USER, description: 'Клиент магазина' },
      { name: AuthorityNameEnum.ADMIN, description: 'Администратор магазина' },
      { name: AuthorityNameEnum.EMPLOYEE, description: 'Работник магазина' },
    ];
    for (const authorityData of authorities) {
      const authority = this.authorityRepository.create(authorityData);
      await this.authorityRepository.save(authority);
    }
  }

  private async seedCategories() {
    const rootCategory = this.categoryRepository.create({
      name: 'Женская одежда',
    });
    const savedRootCategory = await this.categoryRepository.save(rootCategory);
    const subcategories = [
      { name: 'Блузы', parent: savedRootCategory },
      { name: 'Брюки', parent: savedRootCategory },
      { name: 'Комбинезоны', parent: savedRootCategory },
    ];
    for (const subcategoryData of subcategories) {
      const subcategory = this.categoryRepository.create(subcategoryData);
      await this.categoryRepository.save(subcategory);
    }
    console.log('Категории созданы');
  }

  private async seedColors() {
    const colors = ['Белый', 'Синий', 'Графит'];
    for (const colorValue of colors) {
      const color = this.colorRepository.create({ value: colorValue });
      await this.colorRepository.save(color);
    }
    console.log('Цвета созданы');
  }

  private async seedSizes() {
    const sizes = ['42', '44', '46', '48'];
    for (const sizeValue of sizes) {
      const size = this.sizeRepository.create({ value: sizeValue });
      await this.sizeRepository.save(size);
    }
    console.log('Размеры созданы');
  }

  private async seedItems() {
    const blousesCategory = await this.categoryRepository.findOne({
      where: { name: 'Блузы' },
    });
    const pantsCategory = await this.categoryRepository.findOne({
      where: { name: 'Брюки' },
    });
    const overallsCategory = await this.categoryRepository.findOne({
      where: { name: 'Комбинезоны' },
    });
    const whiteColor = await this.colorRepository.findOne({
      where: { value: 'Белый' },
    });
    const blueColor = await this.colorRepository.findOne({
      where: { value: 'Синий' },
    });
    const graphiteColor = await this.colorRepository.findOne({
      where: { value: 'Графит' },
    });
    const sizes = await this.sizeRepository.find();
    const itemsData = [
      {
        name: 'М1 Блуза свободного кроя',
        article: 'BL001',
        price: 3690.0,
        description:
          'Стильная блуза свободного кроя из натурального хлопка. Идеально подходит для повседневного образа.',
        toDisplay: true,
        quantityInStock: 10,
        category: blousesCategory,
        colors: [whiteColor, blueColor],
        photos: [
          'https://2.downloader.disk.yandex.ru/preview/f5663e31faae489b9327d174abf4998ee2cde4969dc7e1ddcf1835f87fe185d7/inf/mWUBaE00WDi7A3JrTgAM71rmbwEvtu6xOjtuAqmdGkdgww3TxL7LG6dftL9m5n7F75vp6QJA1HT0yoaH-3juHw%3D%3D?uid=1405807076&filename=img1.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1405807076&tknv=v3&size=2560x1237',
          'https://4.downloader.disk.yandex.ru/preview/c24d37b7e0c99e3efa500c69ae9d417e63ab584c589fc029bf9edd833290d39c/inf/21cvGzlfSWygEc7ShPr71blI4eZm2NYGJqGnALyOXKcfDIyMBDLW5bIoDuJLd6Z_75AzqzH2wHfQQPOTGZ9ipg%3D%3D?uid=1405807076&filename=img2.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1405807076&tknv=v3&size=2560x1237',
        ],
      },
      {
        name: 'М8 Джоггеры',
        article: 'BR001',
        price: 3200.0,
        description: 'Джоггеры с резинкой на поясе и двумя карманами.',
        toDisplay: true,
        quantityInStock: 10,
        category: pantsCategory,
        colors: [blueColor, graphiteColor],
        photos: [
          'https://2.downloader.disk.yandex.ru/preview/9b67ea797783f299f510963b4bcb45adda763e1d82a021e5de4297df9b51f659/inf/ZRsVB36iGT-fKH31uq-ATztZKWqBbo7LWpM3zfwt-wmZJsyRF81ECxp56a8-yU2uqs1C0YUBXFe2SyuC4FB4PA%3D%3D?uid=1405807076&filename=img1.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1405807076&tknv=v3&size=2560x1237',
          'https://1.downloader.disk.yandex.ru/preview/63934b4c0ff5c1c7a734740a58288e41dc7c030bdc9f7fa86ed468f74ae6fdcd/inf/BW92zen0Uaf_G77BQ5qecziwVKFO5jSfgPjDwQqFdpqw7UMrRY1uGn8iGsE8dche8GrP79lx9F-GYaX2ZSWFvg%3D%3D?uid=1405807076&filename=img2.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1405807076&tknv=v3&size=2560x1237',
        ],
      },
      {
        name: 'М7 Комбинезон',
        article: 'KM001',
        price: 5950.0,
        description:
          'Комбинезон с резиночки на рукавах и штанинах, большими, вместительными карманами и акцентом на талии в виде пояса.',
        toDisplay: true,
        quantityInStock: 10,
        category: overallsCategory,
        colors: [whiteColor, graphiteColor],
        photos: [
          'https://2.downloader.disk.yandex.ru/preview/10332a4066c489f97398d1ff9202b34cf69fe8df815e6e5ca4f1e9d964cb7d0c/inf/AjISTVDMtmkAn-DsiJJRLvxoGLjEAZXf1hdaQvGJVcJ23c1NaL3ADL3YqQ13eSExGjmEQylKUE5o9z9BNBJKnw%3D%3D?uid=1405807076&filename=img1.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1405807076&tknv=v3&size=2560x1237',
          'https://4.downloader.disk.yandex.ru/preview/3c90fa3d4e782c4b077096889a4d7e623a0f7ffdb33770d7f8b26eb694f43b36/inf/b-vGbRkPY6K2Yd-8jPx9UfWNQf0xFF0gxvCSD3PYyVNvBNOlPrp34zNMy37FoMQz4pW__8MIP9S0Jlh4qeEjog%3D%3D?uid=1405807076&filename=img2.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1405807076&tknv=v3&size=2560x1237',
        ],
      },
    ];
    for (const itemData of itemsData) {
      const item = this.itemRepository.create({
        name: itemData.name,
        article: itemData.article,
        price: itemData.price,
        description: itemData.description,
        toDisplay: itemData.toDisplay,
        quantityInStock: itemData.quantityInStock,
        category: itemData.category,
        colors: itemData.colors,
        sizes: sizes,
      });
      const savedItem = await this.itemRepository.save(item);
      for (const photoUrl of itemData.photos) {
        const photo = this.photoRepository.create({
          url: photoUrl,
          item: savedItem,
        });
        await this.photoRepository.save(photo);
      }
    }
    console.log('Товары созданы');
  }
}
