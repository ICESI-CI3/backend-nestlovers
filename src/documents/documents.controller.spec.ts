import { Test, TestingModule } from '@nestjs/testing';
import { ProjectType } from '../common/enums/project-type.enum';
import { Role } from '../common/enums/rol.enum';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { DocumentsModule } from './documents.module';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { ProjectsController } from '../projects/projects.controller';
import { ProjectsService } from '../projects/projects.service';
import { Phase } from '../common/enums/phase.enum';
import { CreateDocumentDto } from './dto/create-document.dto';

describe('DocumentsController', () => {

    let controller: DocumentsController;
    let service: DocumentsService;

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

        id: '1', 
        name: 'Project 1', 
        email: 'project1@example.com', 
        description: 'project1 description', 
        type: ProjectType.PRE,
        creatorId: '1',
        creator: {mockUsersService},
    }

    const mockDocument1 = {

        id: "1",
        name: "Document 1",
        progress_percentage: 1,
        phase: Phase.PHASE1,
        part: 1,
        content: "Content 1",
        projectId: "1"

    }
    const mockDocument2 = {

        id: "2",
        name: "Document 2",
        progress_percentage: 1,
        phase: Phase.PHASE1,
        part: 1,
        content: "Content 1",
        projectId: "1"

    }

    const mockDocumentService = {

        create: jest.fn((dto) => {
            mockDocument1
        }),

        findAll: jest.fn(() => [
            
            {

            id: '1',
            name: 'Document 1',
            progress_percentage: 1,
            phase: Phase.PHASE1,
            part: 1,
            content: 'Content 1',
            projectId : 1,
            project: {
                id: '1',
                name: 'Project 1',
                description: 'project1 description',
                type: ProjectType.PRE,
                creatorId: 1,
                creator: {
                    id: '1',
                    name: 'Test User1',
                    email: 'test1@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
                documents: []
            }

        },

        {

            id: '2',
            name: 'Document 2',
            progress_percentage: 2,
            phase: Phase.PHASE1,
            part: 2,
            content: 'Content 2',
            projectId : 2,
            project: {
                id: '2',
                name: 'Project 2',
                description: 'project2 description',
                type: ProjectType.PRE,
                creatorId: 2,
                creator: {
                    id: '2',
                    name: 'Test User2',
                    email: 'test2@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
                documents: []
            }

        }
    
    
    ]),

        findOne: jest.fn(id => (
            
            {

                id: '2',
                name: 'Document 2',
                progress_percentage: 2,
                phase: Phase.PHASE1,
                part: 2,
                content: 'Content 2',
                projectId : 2,
                project: {
                    id: '2',
                    name: 'Project 2',
                    description: 'project2 description',
                    type: ProjectType.PRE,
                    creatorId: 2,
                    creator: {
                        id: '2',
                        name: 'Test User2',
                        email: 'test2@example.com',
                        phone: '123456789',
                        password: 'password',
                        role: Role.USER,
                        projects: []
                    },
                    documents: []
                }
    
            }
    
        )),

    }

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({

            imports: [
                JwtModule.register({
                  global: true,
                  secret: process.env.SECRET_KEY,
                  signOptions: { expiresIn: '1d' },
                }),
            ],

            controllers: [DocumentsController, ProjectsController, UsersController],
            providers: [
                {
                    provide: ProjectsService,
                    useValue: mockProjectsService,
                },
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                {

                    provide: DocumentsService,
                    useValue: mockDocumentService,

                }
            ],


        }).compile();

        controller = module.get<DocumentsController>(DocumentsController);
        service = module.get<DocumentsService>(DocumentsService);

    });

    it('should return one document', () => {

        const result = controller.findOne('2');

        expect(result).toEqual({

            id: '2',
                name: 'Document 2',
                progress_percentage: 2,
                phase: Phase.PHASE1,
                part: 2,
                content: 'Content 2',
                projectId : 2,
                project: {
                    id: '2',
                    name: 'Project 2',
                    description: 'project2 description',
                    type: ProjectType.PRE,
                    creatorId: 2,
                    creator: {
                        id: '2',
                        name: 'Test User2',
                        email: 'test2@example.com',
                        phone: '123456789',
                        password: 'password',
                        role: Role.USER,
                        projects: []
                    },
                    documents: []
                }

        });

    });

    it('should show all the documents', async () => {

        const result = await controller.findAll();

        expect(result).toEqual([

            {

                id: '1',
                name: 'Document 1',
                progress_percentage: 1,
                phase: Phase.PHASE1,
                part: 1,
                content: 'Content 1',
                projectId : 1,
                project: {
                    id: '1',
                    name: 'Project 1',
                    description: 'project1 description',
                    type: ProjectType.PRE,
                    creatorId: 1,
                    creator: {
                        id: '1',
                        name: 'Test User1',
                        email: 'test1@example.com',
                        phone: '123456789',
                        password: 'password',
                        role: Role.USER,
                        projects: []
                    },
                    documents: []
                }
    
            },
    
            {
    
                id: '2',
                name: 'Document 2',
                progress_percentage: 2,
                phase: Phase.PHASE1,
                part: 2,
                content: 'Content 2',
                projectId : 2,
                project: {
                    id: '2',
                    name: 'Project 2',
                    description: 'project2 description',
                    type: ProjectType.PRE,
                    creatorId: 2,
                    creator: {
                        id: '2',
                        name: 'Test User2',
                        email: 'test2@example.com',
                        phone: '123456789',
                        password: 'password',
                        role: Role.USER,
                        projects: []
                    },
                    documents: []
                }
    
            }

        ])

    })
     

    it('should create a document', async () => {
        // Arrange
        const createDocumentDto: CreateDocumentDto = {
            content: 'Content 1',
        };
        const projectId = 2;
        const creatorId = 2;


        jest.spyOn(service, 'create').mockResolvedValueOnce({

            id: '1',
            name: 'Document 1',
            progress_percentage: 1,
            phase: Phase.PHASE1,
            part: 1,
            content: 'Content 1',
            projectId,
            project: {
                id: '1',
                name: 'Project 1',
                description: 'project1 description',
                type: ProjectType.PRE,
                creatorId: 1,
                creator: {
                    id: '1',
                    name: 'Test User1',
                    email: 'test1@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
                documents: []
            }
        });

        // Act
        const result = await controller.createPhase1Part1(createDocumentDto, '2');

        // Assert
        expect(result).toEqual({
            id: '1',
            name: 'Document 1',
            progress_percentage: 1,
            phase: Phase.PHASE1,
            part: 1,
            content: 'Content 1',
            projectId,
            project: {
                id: '1',
                name: 'Project 1',
                description: 'project1 description',
                type: ProjectType.PRE,
                creatorId: 1,
                creator: {
                    id: '1',
                    name: 'Test User1',
                    email: 'test1@example.com',
                    phone: '123456789',
                    password: 'password',
                    role: Role.USER,
                    projects: []
                },
                documents: []
            }
        });
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    


});