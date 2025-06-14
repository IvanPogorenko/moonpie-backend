import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { AdminRegistrationDto } from './dto/admin-registration.dto';
import * as bcrypt from 'bcrypt';
import { Authority } from '../../users/entities/authority.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
  ) {}

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
