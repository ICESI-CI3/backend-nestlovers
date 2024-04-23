import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { usersSeed } from './data/users.seed';
import { User } from '../users/entities/user.entity';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/common/enums/rol.enum';
import { ProjectsService } from 'src/projects/projects.service';
import { projectsSeed } from './data/projects.seed';

@Injectable()
export class SeedService {

    private superadminUserToken: { token: string };

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly projectService: ProjectsService,
    ) {}

    /**
     * Populate the database with seed data.
     * 
     * @returns A message indicating that the database has been populated successfully.
     */
    async populateDB() {
        await this.registerUsersWithSeedData();

        await this.createProjects();

        return 'Database populated successfully';
    }

    /**
     * Register the users with the seed data.
     */
    private async registerUsersWithSeedData() {
        await this.authService.registerUsersWithSeedData(usersSeed);

        const roleAdminAssignment = { "role": Role.ADMIN }
        const seedAdminUser = await this.userService.findOneByEmail(usersSeed[0].email);

        this.userService.assignRole(seedAdminUser.id, roleAdminAssignment);
    }

    /**
     * Create the projects with the seed data.
     */
    private async createProjects() {
        const normalUser1 = await this.userService.findOneByEmail(usersSeed[1].email);
        const normaluser1Projects = projectsSeed.slice(0, 2);

        const normalUser2 = await this.userService.findOneByEmail(usersSeed[2].email);
        const normaluser2Projects = projectsSeed.slice(2);

        await this.projectService.createProjectsWithSeedData(normaluser1Projects, normalUser1.id);
        await this.projectService.createProjectsWithSeedData(normaluser2Projects, normalUser2.id);
    }
}
