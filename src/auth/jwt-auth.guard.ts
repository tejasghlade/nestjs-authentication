// auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/user/entity/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      // Attempt JWT authentication
      const canActivate = await super.canActivate(context);
      if (canActivate) {
        return true; // Authenticated user, proceed
      }
    } catch (error) {
      // If JWT is invalid or missing, assign guest role
      request.user = { role: UserRole.GUEST };
      return true; // Allow guest access
    }

    // If no error but not authenticated (shouldn't happen), assign guest
    request.user = { role: UserRole.GUEST };
    return true;
  }

  // Override handleRequest to customize user object
  handleRequest(err, user) {
    if (err || !user) {
      return { role: UserRole.GUEST }; // Default to guest if no user
    }
    return user; // Return authenticated user
  }
}
