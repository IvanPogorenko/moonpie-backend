import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { User } from '../../users/entities/user.entity';
import { Authority } from '../../users/entities/authority.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Authority])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
