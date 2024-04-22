import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Role } from 'src/common/enums/rol.enum';
import { AuthOwnProject } from 'src/projects/decorators/own-project.decorator';
import { Phase } from 'src/common/enums/phase.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Controller('documents')
export class DocumentsController {

  constructor(
    private readonly documentsService: DocumentsService
  ) {}

  /**
   * Creates a new document corresponding to Phase 1, Part 1 for a specific project.
   * 
   * @param createDocumentDto DTO containing the necessary data to create the document. It includes the content of the document.
   * @param projectId Unique identifier of the project the document belongs to.
   * @returns The created document.
   */
  @Post('docPhase1Part1/project/:id')
  @AuthOwnProject([ Role.ADMIN, Role.USER ])
  createPhase1Part1(
    @Body()
    createDocumentDto: CreateDocumentDto,

    @Param('id')
    projectId: string,
  ) {
    const name = `Fase 1. (1. A_B_C) - Project ${ projectId }`;
    const phase = Phase.PHASE1;
    const part = 1;
    
    return this.documentsService.create(createDocumentDto, name, phase, part, projectId);
  }

  /**
   * Returns all the documents in the database.
   * 
   * @returns All documents in the database.
   */
  @Get()
  @Auth([ Role.ADMIN ])
  findAll() {
    return this.documentsService.findAll();
  }

  /**
   * Returns a document by its id.
   * 
   * @param id The id of the document.
   * @returns The document with the given id.
   */
  @Get('byID/:id')
  @Auth([ Role.ADMIN ])
  findOne(
    @Param('id') 
    id: string
  ) {
    return this.documentsService.findOne(id);
  }

  /**
   * Returns all the documents that belong to a project.
   * 
   * This route is protected and only users with the ADMIN role can access it.
   * 
   * @param projectId The project id.
   * @returns All the documents that belong to a project.
   */
  @Get('byProject/:id')
  @Auth([ Role.ADMIN ])
  findDocumentsByProject(
    @Param('id')
    projectId: string,
  ) {
    return this.documentsService.findDocumentsByProject(projectId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}
