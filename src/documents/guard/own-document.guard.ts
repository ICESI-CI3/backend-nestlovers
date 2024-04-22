import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DocumentsService } from '../documents.service';
import { ProjectsService } from 'src/projects/projects.service';

/**
 * Create a new guard called OwnDocumentGuard that implements the CanActivate interface. This guard will check if the user is the owner of the document.
 * 
 * The OwnDocumentGuard class receives the DocumentsService and ProjectsService classes from the services to get the document and project data.
 * 
 * The canActivate method receives the ExecutionContext object as an argument. This object contains the request object, the route handler, and other useful information.
 * 
 * The OwnDocumentGuard class checks if the user is the owner of the document. If the user is the owner, the guard allows access to the route.
 * 
 * If the user is not the owner of the document, the guard throws an UnauthorizedException, denying access to the route.
 */
@Injectable()
export class OwnDocumentGuard implements CanActivate {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly projectsService: ProjectsService,
  ) {}
  
  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const docId = context.switchToHttp().getRequest().params.docId;
    const doc = await this.documentsService.findOne(docId);
    
    if (!doc) {
      return false;
    }

    const projectId = doc.projectId.toString();
    const project = await this.projectsService.findOne(projectId);

    if (!project) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();
    const userId = user.id;

    if (project.creatorId !== userId) {
      throw new UnauthorizedException('Unauthorized. You are not the owner of this document.');
    }

    return true;
  }
}
