import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Role } from '../common/enums/rol.enum';
import { AuthOwnProject } from '../projects/decorators/own-project.decorator';
import { Phase } from '../common/enums/phase.enum';
import { Auth } from '../common/decorators/auth.decorators';
import { UserActive } from 'src/common/decorators/user-active.decorator';
import { UserActiveI } from 'src/common/interfaces/user-active.interface';
import { DocOfProjectGuard } from './guard/doc-of-project.guard';
import { AuthOwnDocument } from './decorators/own-document.decorator';

@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {}

    /**
     * Creates a new document corresponding to Phase 1, Part 1 for a specific project.
     *
     * @param createDocumentDto DTO containing the necessary data to create the document. It includes the content of the document.
     * @param projectId Unique identifier of the project the document belongs to.
     * @returns The created document.
     */
    @Post('docPhase1Part1/project/:id')
    @AuthOwnProject([Role.ADMIN, Role.USER])
    createPhase1Part1(
        @Body()
        createDocumentDto: CreateDocumentDto,

        @Param('id')
        projectId: string,
    ) {
        const name = `Fase 1. (1. A_B_C) - Project ${projectId}`;
        const phase = Phase.PHASE1;
        const part = 1;

        return this.documentsService.create(
            createDocumentDto,
            name,
            phase,
            part,
            projectId,
        );
    }

    /**
     * Returns all the documents in the database.
     *
     * @returns All documents in the database.
     */
    @Get()
    @Auth([Role.ADMIN])
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
    @Auth([Role.ADMIN])
    findOne(
        @Param('id')
        id: string,
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
    @Auth([Role.ADMIN])
    findDocumentsByProject(
        @Param('id')
        projectId: string,
    ) {
        return this.documentsService.findDocumentsByProject(projectId);
    }

    /**
     * Retrieves documents owned by the current user for a specific project.
     *
     * This route is protected and only users with the ADMIN or USER role can access it.
     *
     * Also, the user must be the owner of the project to get the documents.
     *
     * @param projectId The unique identifier of the project for which documents are to be retrieved.
     * @returns An array of documents owned by the current user for the specified project.
     */
    @Get('own/:id')
    @AuthOwnProject([Role.ADMIN, Role.USER])
    findOwnDocumentsByProject(
        @Param('id')
        projectId: string,
    ) {
        return this.documentsService.findDocumentsByProject(projectId);
    }

    /**
     * Returns a document by its id if the user is the owner of the document.
     *
     * This route is protected and only users with the ADMIN or USER role can access it.
     *
     * @param id The document id.
     * @returns The document with the given id.
     */
    @Get('byID/own/:id')
    @AuthOwnDocument([Role.ADMIN, Role.USER])
    findOneOwn(
        @Param('id')
        id: string,
    ) {
        return this.documentsService.findOne(id);
    }

    /**
     * Updates a document by its id.
     *
     * This route is protected and only users with the ADMIN or USER role can access it.
     *
     * Also, the user must be the owner of the document to update it.
     *
     * @param docId The document id.
     * @param updateDocumentDto The document data to update.
     * @returns The updated document.
     */
    @Patch('update/:docId')
    @AuthOwnDocument([Role.ADMIN, Role.USER])
    update(
        @Param('docId')
        docId: string,

        @Body()
        updateDocumentDto: UpdateDocumentDto,
    ) {
        return this.documentsService.update(docId, updateDocumentDto);
    }

    /**
     * Removes a document by its id.
     *
     * This route is protected and only users with the SUPER_ADMIN role can access it. This is because only a SUPER_ADMIN can delete any document.
     *
     * @param id The document id.
     * @returns The removed document.
     */
    @Delete('delete/:id')
    @Auth([Role.SUPER_ADMIN])
    remove(
        @Param('id')
        id: string,
    ) {
        return this.documentsService.remove(id);
    }

    /**
     * Removes a document by its id.
     *
     * This route is protected and only users with the ADMIN or USER role can access it.
     *
     * Also, the user must be the owner of the document to delete it.
     *
     * @param docId The document id.
     * @returns The removed document.
     */
    @Delete('deleteMy/:docId')
    @AuthOwnDocument([Role.ADMIN, Role.USER])
    removeMy(
        @Param('id')
        id: string,
    ) {
        return this.documentsService.remove(id);
    }
}
