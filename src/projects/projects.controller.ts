import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';
import { UserActive } from 'src/common/decorators/user-active.decorator';
import { UserActiveI } from 'src/common/interfaces/user-active.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Controller('projects')
export class ProjectsController {

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Auth([ Role.ADMIN, Role.USER ])
  async create(
    @Body()
    createProjectDto: CreateProjectDto,

    @UserActive()
    user: UserActiveI,
  ) {
    const creator: User = await this.usersService.findOneByEmail(user.email);

    return this.projectsService.create(createProjectDto, creator);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') 
    id: string
  ) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string, 
    @Body() 
    updateProjectDto: UpdateProjectDto
  ) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(
    @Param('id') 
    id: string
  ) {
    return this.projectsService.remove(+id);
  }
}
