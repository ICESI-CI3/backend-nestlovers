import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly userService: UsersService,
  ) {}

  async create(createProjectDto: CreateProjectDto, creatorId: number) {
    const name = createProjectDto.name;
    const description = createProjectDto.description;
    const type = createProjectDto.type;

    const creator = await this.userService.findOne(creatorId);

    if (!creator) {
      throw new BadRequestException('User not found');
    }

    // return 'This action adds a new project';
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
