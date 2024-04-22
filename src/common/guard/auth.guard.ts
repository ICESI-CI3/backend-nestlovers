import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * The canActivate method is one of the main methods that a guard can implement. This method is executed before a request
 * to a specific path or endpoint is processed. The canActivate function returns a Boolean value or a promise that 
 * resolves to a Boolean value. Depending on the result of this function, access to the protected endpoint will be allowed or denied.
 * 
 * The AuthGuard class ensures that only authenticated users (with a valid token) can access the protected routes.
 * 
 * This guard can be added to the different routes that need to be protected. 
 */
@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      
      const payload = this.jwtService.verify(token);

      // Inject the user object into the request object. It is useful to access the user object in the controller.
      request.user = payload;

    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
