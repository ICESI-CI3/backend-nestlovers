import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly userService: UsersService,
  ) {}

  /**
   * Creates a new project.
   * 
   * Validates that the creator exists and, if not, throws a BadRequestException. Otherwise, it saves the project into de DB.
   * 
   * @param createProjectDto The project data to create.
   * @param creator The user that creates the project.
   * @returns The project created.
   */
  async create(createProjectDto: CreateProjectDto, creatorId: string) {
    const name = createProjectDto.name;
    const description = createProjectDto.description;
    const type = createProjectDto.type;

    const creator = await this.userService.findOne(creatorId);

    if (!creator) {
      throw new BadRequestException('User not found');
    }

    return this.projectsRepository.save({ name, description, type, creator });
  }

  /**
   * Returns all projects in the database.
   * 
   * @returns All projects in the database.
   */
  findAll() {
    return this.projectsRepository.find();
  }

  /**
   * Returns a project by its id.
   * 
   * @param id The project id.
   * @returns The project with the given id.
   */
  async findOne(id: string) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  /**
   * Returns all projects created by a user.
   * 
   * @param userId The user id.
   * @returns All projects created by the user.
   */
  async findProjectsByUser(userId: string) {
    const user = await this.userService.findOne(userId);

    const projects = await this.projectsRepository.findBy({ creator: user });

    if (!projects || projects.length === 0) {
      throw new NotFoundException('No projects found');
    }

    return projects;
  }

  /**
   * Updates a project by its id.
   * 
   * @param id The project id.
   * @param updateProjectDto The project data to update.
   * @returns The updated project.
   */
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.projectsRepository.save({ ...project, ...updateProjectDto });
  }

  /**
   * Removes a project by its id.
   * 
   * @param id The project id.
   * @returns The removed project.
   */
  async remove(id: string) {
    const project = await this.findOne(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.projectsRepository.remove(project);
  }

  /**
   * Creates multiple projects with seed data.
   * 
   * @param projectsSeed The seed data to create the projects.
   * @param creatorId The user id that creates the projects.
   */
  async createProjectsWithSeedData(projectsSeed: CreateProjectDto[], creatorId: string) {
    for (const project of projectsSeed) {
      const projectExists = await this.projectsRepository.findOneBy({ name: project.name });

      if (!projectExists) {
        await this.create(project, creatorId);
      }
    }
  }
}
