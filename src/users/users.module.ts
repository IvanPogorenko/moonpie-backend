import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority } from './entities/authority.entity';
import { User } from './entities/user.entity';
import { RegistrationController } from './registration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Authority])],
  controllers: [UsersController, RegistrationController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
