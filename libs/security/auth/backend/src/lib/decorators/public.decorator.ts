import { SetMetadata } from '@nestjs/common';
/**
 * Decorator allowing to set a endpoint of a controller public
 */
export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);