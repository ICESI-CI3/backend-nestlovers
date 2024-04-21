import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

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
  async create(createProjectDto: CreateProjectDto, creator: User) {
    const name = createProjectDto.name;
    const description = createProjectDto.description;
    const type = createProjectDto.type;

    if (!creator) {
      throw new BadRequestException('User not found');
    }

    return this.projectsRepository.save({ name, description, type, creator });
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
