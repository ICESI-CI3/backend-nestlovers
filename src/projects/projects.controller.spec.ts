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
    
    const mockUsersService = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        phone: '123456789',
        password: 'password',
        role: Role.USER,
        projects: []        
    }

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
        findAll: jest.fn(() => [
            {
                id: '1', 
                name: 'Project 1', 
                email: 'project1@example.com', 
                description: 'project1 description', 
                type: ProjectType.PRE,
                creatorId: '1',
                creator: {
                    id: '1',
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
            },
            {
                id: '2', 
                name: 'Project 2', 
                email: 'project2@example.com', 
                description: 'project2 description', 
                type: ProjectType.PRE,
                creatorId: '2',
                creator: {
                    id: '2',
                    name: 'Test User',
                    email: 'test2@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
            },
        ]),

        findOne: jest.fn(id =>({

            id: '2', 
            name: 'Project 2', 
            email: 'project2@example.com', 
            description: 'project2 description', 
            type: ProjectType.PRE,
            creatorId: '2',
            creator: {
                id: '2',
                name: 'Test User',
                email: 'test2@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
                projects: []
            },})),

        findProjectsByUser: jest.fn().mockReturnValue({
            id: '2',
            name: 'Project 2',
            email: 'project2@example.com',
            description: 'project2 description', 
            type: ProjectType.PRE,
            creatorId: '2',
            creator: {
                id: '2',
                name: 'Test User',
                email: 'test2@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
            projects: [],
        },}),

        update: jest.fn().mockReturnValue({
            id: '2',
            name: 'Project 2',
            email: 'project2@example.com',
            description: 'project2 description', 
            type: ProjectType.PRE,
            creatorId: '2',
            creator: {
                id: '2',
                name: 'Test User',
                email: 'test2@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
            projects: [],
        },}),

        delete: jest.fn().mockReturnValue({
            id: '2',
            name: 'Project 2',
            email: 'project2@example.com',
            description: 'project2 description', 
            type: ProjectType.PRE,
            creatorId: '2',
            creator: {
                id: '2',
                name: 'Test User',
                email: 'test2@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
            projects: [],
        },}),
            
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({

            imports: [
                JwtModule.register({
                  global: true,
                  secret: process.env.SECRET_KEY,
                  signOptions: { expiresIn: '1d' },
                }),
            ],
            
            controllers: [ProjectsController, UsersController],
            providers: [
                {
                    provide: ProjectsService,
                    useValue: mockProjectsService,
                },
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                }
            ],
            
        }).compile();

        controller = module.get<ProjectsController>(ProjectsController);
        service = module.get<ProjectsService>(ProjectsService);
    });
/**
 * 
 * 
 
    it('should return the deleted project', () => {

        expect(controller.remove('2')).toEqual({

            id: '2',
            name: 'Project 2',
            email: 'project2@example.com',
            description: 'project2 description', 
            type: ProjectType.PRE,
            creatorId: '2',
            creator: {
                id: '2',
                name: 'Test User',
                email: 'test2@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
                projects: [],
            }

        });

    });

    it('should return the updated project', () => {

        const updateDto = {
            name: 'project 3',
            description: 'Description of project 3',
            type: ProjectType.POS
        }

        expect(controller.update('2', updateDto)).toEqual({
            id: '2',
            name: 'Project 3',
            email: 'project2@example.com',
            description: 'Description of project 3', 
            type: ProjectType.POS,
            creatorId: '2',
            creator: {
                id: '2',
                name: 'Test User',
                email: 'test2@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
            projects: [],
        }});
        
    });

    */

    it('should return one project by its creator id', () => {

        const result = controller.findProjectsByUser('2')

        expect(result).toEqual({

            id: '2', 
            name: 'Project 2', 
            email: 'project2@example.com', 
            description: 'project2 description', 
            type: ProjectType.PRE,
            creatorId: '2',
            creator: {
                id: '2',
                name: 'Test User',
                email: 'test2@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
                projects: []
            }

        });

    });

    it('should return one project', () => {

        const result = controller.findOne('2');

        expect(result).toEqual({

            id: '2', 
            name: 'Project 2', 
            email: 'project2@example.com', 
            description: 'project2 description', 
            type: ProjectType.PRE,
            creatorId: '2',
            creator: {
                id: '2',
                name: 'Test User',
                email: 'test2@example.com',
                phone: '123456789',
                password: 'password',
                role: Role.USER,
                projects: []
            }

        });

    });

    it('should return all the projects', async () => {

        const result = await controller.findAll();

        expect(result).toEqual([

            {
                id: '1', 
                name: 'Project 1', 
                email: 'project1@example.com', 
                description: 'project1 description', 
                type: ProjectType.PRE,
                creatorId: '1',
                creator: {
                    id: '1',
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
            },
            {
                id: '2', 
                name: 'Project 2', 
                email: 'project2@example.com', 
                description: 'project2 description', 
                type: ProjectType.PRE,
                creatorId: '2',
                creator: {
                    id: '2',
                    name: 'Test User',
                    email: 'test2@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
            },

        ]);

        expect(mockProjectsService.findAll).toHaveBeenCalled();

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
