import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { Phase } from 'src/common/enums/phase.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DocumentsService {

  constructor (
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
    private readonly projectsService: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  /**
   * Creates a new document.
   * 
   * Validates that there is no another document with the same name. If there is, an exception is thrown. Otherwise, saves the document.s
   * 
   * @param createDocumentDto The content of the document.
   * @param docName The name of the document.
   * @param docPhase The phase to which the document belongs.
   * @param docPart The part to which the document belongs.
   * @param projectId The id of the project to which the document belongs.
   * @returns The document created.
   */
  async create(createDocumentDto: CreateDocumentDto, docName: string, docPhase: Phase, docPart: number, projectId: string) {
    const document = await this.findDocumentByName(docName);

    if(document) {
      throw new BadRequestException('Bad request. This document already exists.');
    }

    const project = await this.projectsService.findOne(projectId);
    const docContent = createDocumentDto.content;

    return this.documentsRepository.save({ name: docName, phase: docPhase, part: docPart, content: docContent, project: project });
  }

  /**
   * Returns all the documents in the database.
   * 
   * @returns All documents in the database.
   */
  findAll() {
    return this.documentsRepository.find();
  }

  /**
   * Returns a document by its id.
   * 
   * @param id The id of the document.
   * @returns The document with the given id.
   */
  async findOne(id: string) {
    const doc = await this.documentsRepository.findOneBy({ id });

    if(!doc) {
      throw new NotFoundException('Document not found');
    }

    return doc;
  }

  /**
   * Returns a document by its name.
   * 
   * @param name The name of the document.
   * @returns The document with the given name.
   */
  async findDocumentByName(name: string) {
    return await this.documentsRepository.findBy({ name }); 
  }

  /**
   * Returns all the documents that belong to a project.
   * 
   * @param projectId The project id.
   * @returns All documents that belong to the given project.
   */
  async findDocumentsByProject(projectId: string) {
    const project = await this.projectsService.findOne(projectId);

    const docs = await this.documentsRepository.findBy({ project: project });

    if (!docs || docs.length === 0) {
      throw new NotFoundException('No documents found.');
    }

    return docs;
  }

  /**
   * Updates a document.
   * 
   * Validates that the document exists. If it does not, an exception is thrown. Otherwise, updates the document.
   * 
   * @param docId The id of the document to update.
   * @param updateDocumentDto The content to update.
   * @returns The updated document.
   */
  async update(docId: string, updateDocumentDto: UpdateDocumentDto) {
    const doc = await this.findOne(docId);

    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    return this.documentsRepository.save({ ...doc, ...updateDocumentDto });
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
