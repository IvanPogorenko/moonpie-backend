import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Authority } from './entities/authority.entity';
import { ProfileInfoDto } from './dto/profile-info.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ClientRegistrationDto } from './dto/client-registration.dto';
import { AuthorityNameEnum } from '../common/enums/authority-name.enum';
import * as bcrypt from 'bcrypt';
import { AdminRegistrationDto } from './dto/admin-registration.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }
    return user;
  }

  async getProfileInfo(userId: number): Promise<ProfileInfoDto> {
    const user = await this.findById(userId);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      email: user.middleName,
      phoneNumber: user.phone,
    };
  }

  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    const user = await this.findById(userId);
    const updatedFields: (keyof UpdateProfileDto)[] = [
      'email',
      'firstName',
      'lastName',
      'middleName',
      'phoneNumber',
    ];
    for (const field of updatedFields) {
      if (updateProfileDto[field]) {
        (user as any)[field] = updateProfileDto[field];
      }
    }
    await this.userRepository.save(user);
  }

  async registerClient(
    clientRegistrationDto: ClientRegistrationDto,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: clientRegistrationDto.email },
    });
    if (existingUser) {
      throw new Error('Пользователь с таким Email уже существует');
    }
    const userAuthority = await this.authorityRepository.findOne({
      where: { name: AuthorityNameEnum.USER },
    });
    const hashedPassword = await bcrypt.hash(
      clientRegistrationDto.password,
      10,
    );
    const newUser = this.userRepository.create({
      firstName: clientRegistrationDto.firstName,
      lastName: clientRegistrationDto.lastName,
      middleName: clientRegistrationDto.middleName,
      email: clientRegistrationDto.email,
      password: hashedPassword,
      authorities: [userAuthority],
    });
    return this.userRepository.save(newUser);
  }

  async registerEmployOrAdmin(
    adminRegistrationDto: AdminRegistrationDto,
  ): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: adminRegistrationDto.email },
    });
    if (existingUser) {
      throw new Error('Пользователь с таким Email уже существует');
    }
    const userAuthority = await this.authorityRepository.findOne({
      where: { name: adminRegistrationDto.authorityName },
    });
    const hashedPassword = await bcrypt.hash(adminRegistrationDto.password, 10);
    const newUser = this.userRepository.create({
      firstName: adminRegistrationDto.firstName,
      lastName: adminRegistrationDto.lastName,
      middleName: adminRegistrationDto.middleName,
      email: adminRegistrationDto.email,
      password: hashedPassword,
      authorities: [userAuthority],
    });
    return this.userRepository.save(newUser);
  }
}
