import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/roles.model';

export const META_ROLES = 'roles';

export const RolesProtected = (...roles: Role[]) => SetMetadata(META_ROLES, roles);
