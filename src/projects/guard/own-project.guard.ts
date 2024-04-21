import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from '../projects.service';

/**
 * Create a new guard called OwnProjectGuard that implements the CanActivate interface. This guard will check if the user is the owner of the project.
 * 
 * The OwnProjectGuard class receives the ProjectsService and UsersService classes from the services to get the project and user data.
 * 
 * The canActivate method receives the ExecutionContext object as an argument. This object contains the request object, the route handler, and other useful information.
 * 
 * The OwnProjectGuard class checks if the user is the owner of the project. If the user is the owner, the guard allows access to the route.
 * 
 * If the user is not the owner of the project, the guard throws an UnauthorizedException, denying access to the route.
 */
@Injectable()
export class OwnProjectGuard implements CanActivate {

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly userService: UsersService,
  ) {}
  
  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();

    const creator = await this.userService.findOneByEmail(user.email);

    if (!creator) {
      return false;
    }

    const projectId = context.switchToHttp().getRequest().params.id;
    const project = await this.projectsService.findOne(projectId);

    if (!project) {
      return false;
    }

    if (project.creatorId !== +creator.id) {
      throw new UnauthorizedException('Unauthorized. You are not the owner of this project.');
    }

    return true;
  }
}
