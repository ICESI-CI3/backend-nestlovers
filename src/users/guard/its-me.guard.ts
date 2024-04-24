import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

/**
 * Create a new guard called ItsMeGuard that implements the CanActivate interface. This guard will check if the user that is making the request is the same user that he/she is trying to access.
 * 
 * The ItsMeGuard class receives the UsersService class from the services to get the user data.
 * 
 * The canActivate method receives the ExecutionContext object as an argument. This object contains the request object, the route handler, and other useful information.
 * 
 * The ItsMeGuard class checks if the user is the same user that he/she is trying to access. If the user is the owner, the guard allows access to the route.
 * 
 * If the users are different, the guard denies access to the route.
 */
@Injectable()
export class ItsMeGuard implements CanActivate {

  constructor(
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const currentUser = context.switchToHttp().getRequest().user;

    const requestedUserId = context.switchToHttp().getRequest().params.id;

    if (currentUser.id !== +requestedUserId) {
      return false;
    }

    return true;
  }
}
