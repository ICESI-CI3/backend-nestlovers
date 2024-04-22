import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { Phase } from 'src/common/enums/phase.enum';

@Injectable()
export class DocumentsService {

  constructor (
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
    private readonly projectsService: ProjectsService,
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

  findAll() {
    return `This action returns all documents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
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

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
