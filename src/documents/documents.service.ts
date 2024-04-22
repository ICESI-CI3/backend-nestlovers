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
