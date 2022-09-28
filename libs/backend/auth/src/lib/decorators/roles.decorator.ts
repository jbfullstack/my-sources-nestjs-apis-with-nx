import { SetMetadata } from '@nestjs/common';
import { Role } from "@jbhive_be/struct";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);