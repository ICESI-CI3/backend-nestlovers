import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../enums/rol.enum';

/**
 * Create a new guard called RolesGuard that implements the CanActivate interface. This guard will check if the user has the required role to access the route.
 * 
 * The RolesGuard class receives the Reflector class from the @nestjs/core package as a dependency. This class will be used to get the metadata defined in the route handler. It means that it will catch the specified roles for the route, when we use the `@Roles()` decorator. 
 * 
 * The canActivate method receives the ExecutionContext object as an argument. This object contains the request object, the route handler, and other useful information.
 * 
 * The RolesGuard class checks if the route handler has the roles metadata defined using the `@Roles()` decorator. If the metadata is not defined, the guard allows access to the route.
 * 
 * If the metadata is defined, the guard gets the user object from the request and checks if the user has the required role to access the route.
 * 
 * The RolesGuard class returns true if the user has the required role, allowing access to the route. Otherwise, it returns false, denying access to the route.
 */
@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userRole = user.role;

    if (userRole === Role.SUPER_ADMIN) {
      return true;
    }

    if (!roles.includes(userRole)) {
      throw new UnauthorizedException('Unauthorized. You are not allowed to access this route.');
    }

    return true;
  }
}
