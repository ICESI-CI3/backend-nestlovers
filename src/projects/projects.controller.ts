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

  /**
   * Creates a new project.
   * 
   * This route is protected and only users with the ADMIN or USER role can access it.
   * 
   * @param createProjectDto The project data to create.
   * @param user The user that creates the project. It is of type UserActiveI and, for that reason, the method uses the usersService to find the user.
   * @returns The project created.
   */
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

  /**
   * Returns all projects in the database.
   * 
   * @returns All projects in the database.
   */
  @Get()
  @Auth([ Role.ADMIN ])
  findAll() {
    return this.projectsService.findAll();
  }

  /**
   * Returns a project by its id.
   * 
   * @param id The project id.
   * @returns The project with the given id.
   */
  @Get('byID/:id')
  @Auth([ Role.ADMIN ])
  findOne(
    @Param('id') 
    id: string
  ) {
    return this.projectsService.findOne(id);
  }

  /**
   * Returns all projects created by a user.
   * 
   * This route is protected and only users with the ADMIN role can access it.
   * 
   * @param id The user id.
   * @returns All projects created by the user with the given id.
   */
  @Get('byUser/:userId')
  @Auth([ Role.ADMIN ])
  findProjectsByUser(
    @Param('userId')
    id: string
  ) {
    return this.projectsService.findProjectsByUser(id);
  }

  @Get('own/')
  @Auth([ Role.ADMIN, Role.USER ])
  findOwnProjects(
    @UserActive()
    user: UserActiveI
  ) {
    return this.projectsService.findProjectsByUser(user.id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id')
  //   id: string, 
  //   @Body() 
  //   updateProjectDto: UpdateProjectDto
  // ) {
  //   return this.projectsService.update(+id, updateProjectDto);
  // }

  // @Delete(':id')
  // remove(
  //   @Param('id') 
  //   id: string
  // ) {
  //   return this.projectsService.remove(+id);
  // }
}
