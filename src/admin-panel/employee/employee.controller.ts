import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthorityNameEnum } from '../../common/enums/authority-name.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminPathsEnum } from '../enum/admin-paths.enum';
import { AdminRegistrationDto } from './dto/admin-registration.dto';
import { User } from '../../users/entities/user.entity';

@ApiTags('Администрирование сотрудников')
@Controller('employee')
@Roles(AuthorityNameEnum.EMPLOYEE, AuthorityNameEnum.ADMIN)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Добавление сотрудников' })
  @ApiResponse({ status: 200, description: 'Сотрудник добавлен', type: User })
  @Post(AdminPathsEnum.CREATE_EMPLOYEE)
  async createEmployee(@Body() newEmployee: AdminRegistrationDto) {
    return this.employeeService.registerEmployOrAdmin(newEmployee);
  }
}
