import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { usersSeed } from './data/users.seed';
import { User } from '../users/entities/user.entity';
import { LoginDto } from '../auth/dto/login.dto';
import { UsersService } from '../users/users.service';
import { Role } from '../common/enums/rol.enum';
import { ProjectsService } from '../projects/projects.service';
import { projectsSeed } from './data/projects.seed';
import { DocumentsService } from '../documents/documents.service';
import { Phase } from '../common/enums/phase.enum';
import { docSeed } from './data/documents.seed';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class SeedService {

    private projects: Project[] = [];

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly projectService: ProjectsService,
        private readonly documentService: DocumentsService,
    ) {}

    /**
     * Populate the database with seed data.
     * 
     * @returns A message indicating that the database has been populated successfully.
     */
    async populateDB() {
        await this.registerUsersWithSeedData();

        await this.createProjects();

        await this.createDocuments();

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

        const projects1 = await this.projectService.createProjectsWithSeedData(normaluser1Projects, normalUser1.id);
        const projects2 = await this.projectService.createProjectsWithSeedData(normaluser2Projects, normalUser2.id);

        this.projects = [...projects1, ...projects2];
    }

    /**
     * Create the documents with the seed data.
     */
    private async createDocuments() {
        const project1 = this.projects[0];
        const project2 = this.projects[1];
        const project3 = this.projects[2];
        
        // await this.documentService.create(docSeed[0], `Seed Document 1 - Project ${project1.id}`, Phase.PHASE1, 1, project1.id);
        // await this.documentService.create(docSeed[1], `Seed Document 1 - Project ${project2.id}`, Phase.PHASE1, 1, project2.id);
        // await this.documentService.create(docSeed[2], `Seed Document 1 - Project ${project3.id}`, Phase.PHASE1, 1, project3.id);
    }
}
