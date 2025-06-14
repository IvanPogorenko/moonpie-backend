import { Module } from '@nestjs/common';
import { AdminCatalogModule } from './admin-catalog/admin-catalog.module';
import { EmployeeModule } from './employee/employee.module';
import { AdminOrderModule } from './admin-order/admin-order.module';

@Module({
  imports: [AdminCatalogModule, EmployeeModule, AdminOrderModule],
  exports: [AdminCatalogModule, EmployeeModule, AdminOrderModule],
})
export class AdminPanelModule {}
