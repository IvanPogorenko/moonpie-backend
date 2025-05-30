import { AuthorityNameEnum } from '../enums/authority-name.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthorityNameEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
