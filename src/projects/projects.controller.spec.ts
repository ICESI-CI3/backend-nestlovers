import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectType } from '../common/enums/project-type.enum';
import { Role } from '../common/enums/rol.enum';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from './projects.module';

describe('ProjectsController', () => {
    let controller: ProjectsController;
    let service: ProjectsService;

    const mockProjectsService = {
        create: jest.fn((createProjectDto: CreateProjectDto, creatorId: string) => {
            return {
                id: 'A',
                name: createProjectDto.name,
                description: createProjectDto.description,
                type: createProjectDto.type,
                creatorId,
                creator: {
                    id: creatorId,
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
            };
        }),
        // Define otros métodos de ProjectsService según sea necesario
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                  global: true,
                  secret: process.env.SECRET_KEY,
                  signOptions: { expiresIn: '1d' },
                }),
                UsersModule,
                ProjectsModule,
              ],
            controllers: [ProjectsController, UsersController],
            providers: [
                {
                    provide: ProjectsService,
                    useValue: mockProjectsService,
                },
            ],
            
        }).compile();

        controller = module.get<ProjectsController>(ProjectsController);
        service = module.get<ProjectsService>(ProjectsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a project', async () => {
        const createProjectDto: CreateProjectDto = {
            name: 'Test Project',
            description: 'This is a test project',
            type: ProjectType.PRE,
        };

        const creatorId = '1';

        const expectedProject = {
            id: 'A',
            name: 'Test Project',
            description: 'This is a test project',
            type: ProjectType.PRE,
            creatorId,
            creator: {
                id: creatorId,
                name: 'Test User',
                email: 'test@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
                projects: []
            },
        };

        const result = await controller.create(createProjectDto, {
            id: creatorId,
            email: 'test@example.com',
            role: Role.USER,
        });

        expect(result).toEqual(expectedProject);
        expect(mockProjectsService.create).toHaveBeenCalledWith(createProjectDto, creatorId);
    });
});
