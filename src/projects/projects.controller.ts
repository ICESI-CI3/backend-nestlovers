import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Auth } from '../common/decorators/auth.decorators';
import { Role } from '../common/enums/rol.enum';
import { UserActive } from '../common/decorators/user-active.decorator';
import { UserActiveI } from '../common/interfaces/user-active.interface';
import { AuthOwnProject } from './decorators/own-project.decorator';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    /**
     * Creates a new project.
     *
     * This route is protected and only users with the ADMIN or USER role can access it.
     *
     * @param createProjectDto The project data to create.
     * @param user The user that creates the project.
     * @returns The project created.
     */
    @Post()
    @Auth([Role.ADMIN, Role.USER])
    create(
        @Body()
        createProjectDto: CreateProjectDto,

        @UserActive()
        user: UserActiveI,
    ) {
        return this.projectsService.create(createProjectDto, user.id);
    }

    /**
     * Returns all projects in the database.
     *
     * @returns All projects in the database.
     */
    @Get()
    @Auth([Role.ADMIN])
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
    @Auth([Role.ADMIN, Role.USER])
    findOne(
        @Param('id')
        id: string,
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
    @Auth([Role.ADMIN])
    findProjectsByUser(
        @Param('userId')
        id: string,
    ) {
        return this.projectsService.findProjectsByUser(id);
    }

    /**
     * Returns all projects created by the user that is logged in.
     *
     * This route is protected and only users with the ADMIN or USER role can access it.
     *
     * @param user The user that is logged in.
     * @returns All projects created by the user that is logged in.
     */
    @Get('own')
    @Auth([Role.ADMIN, Role.USER])
    findOwnProjects(
        @UserActive()
        user: UserActiveI,
    ) {
        return this.projectsService.findProjectsByUser(user.id);
    }

    /**
     * Updates a project by its id.
     *
     * This route is protected and only users with the ADMIN or USER role can access it.
     *
     * Also, the user must be the owner of the project to update it.
     *
     * @param id The project id.
     * @param updateProjectDto The project data to update.
     * @returns The updated project.
     */
    @Patch('update/:id')
    @AuthOwnProject([Role.ADMIN, Role.USER])
    update(
        @Param('id')
        id: string,

        @Body()
        updateProjectDto: UpdateProjectDto,
    ) {
        return this.projectsService.update(id, updateProjectDto);
    }

    /**
     * Deletes a project by its id.
     *
     * This route is protected and only users with the SUPER_ADMIN role can access it. This is because only a SUPER_ADMIN can delete any project.
     *
     * @param id The project id.
     * @returns The deleted project.
     */
    @Delete('delete/:id')
    @Auth([Role.SUPER_ADMIN])
    remove(
        @Param('id')
        id: string,
    ) {
        return this.projectsService.remove(id);
    }

    /**
     * Deletes a project by its id.
     *
     * This route is protected and only users with the ADMIN or USER role can access it.
     *
     * Also, the user must be the owner of the project to delete it.
     *
     * @param id The project id.
     * @returns The deleted project.
     */
    @Delete('deleteMy/:id')
    @AuthOwnProject([Role.ADMIN, Role.USER])
    removeMy(
        @Param('id')
        id: string,
    ) {
        return this.projectsService.remove(id);
    }
}
