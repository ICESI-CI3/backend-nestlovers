import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProjectsService } from '../../projects/projects.service';
import { DocumentsService } from '../documents.service';

/**
 * Create a new guard called DocOfProjectGuard that implements the CanActivate interface. This guard will check if the document belongs to the project.
 * 
 * The DocOfProjectGuard class receives the ProjectsService and DocumentsService classes from the services to get the project and document data.
 * 
 * The canActivate method receives the ExecutionContext object as an argument. This object contains the request object, the route handler, and other useful information.
 * 
 * The DocOfProjectGuard class checks if the document belongs to the project. If the document belongs to the project, the guard allows access to the route.
 * 
 * If the document does not belong to the project, the guard throws a BadRequestException, denying access to the route.
 */
@Injectable()
export class DocOfProjectGuard implements CanActivate {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly documentsService: DocumentsService,
  ) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const projectId = context.switchToHttp().getRequest().params.id;
    const project = await this.projectsService.findOne(projectId);

    if (!project) {
      return false;
    }

    const documentId = context.switchToHttp().getRequest().params.docId;
    const document = await this.documentsService.findOne(documentId);

    if (!document) {
      return false;
    }

    if (document.projectId !== +projectId) {
      throw new BadRequestException('Bad request. The document does not belong to this project.');
    }

    return true;
  }
}
