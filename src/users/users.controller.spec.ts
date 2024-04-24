import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../common/enums/rol.enum';

describe('UsersController', () => { 
    let controller: UsersController;
    let userService: UsersService;
    const mockUsersService = {

        create: jest.fn((dto) => ({...dto})),
        findOneByEmail: jest.fn((dto) => ({...dto})),
        findByEmailWithPassword: jest.fn((dto) => ({...dto})),
        findOne: jest.fn(id => ({
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            phone: '123456789',
            password: 'password',
            role: Role.USER,
            projects: []
        })), 
        update: jest.fn((dto) => ({...dto})),
        remove: jest.fn((dto) => ({...dto})),
        findAll: jest.fn(() => [
            {
                id: '1', name: 'User 1', email: 'user1@example.com', phone: '123456789', password: '11111', role: Role.USER,
                projects: []
            },
            {
                id: '2', name: 'User 2', email: 'user2@example.com', phone: '987654321', password: '22222',
                role: Role.USER, projects: []
            },
        ]),
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
            controllers: [UsersController],
            providers: [UsersService],  
        }).overrideProvider(UsersService).useValue(mockUsersService).compile();

        userService = new UsersService(null);
        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a user', () => {

        const dto = {
            id: '1234',
            name: 'Jane Doe',
            email: 'janedoe@gmail.com',
            phone: '123456789',
            password: '11111',
        };

        expect(controller.create(dto)).toEqual({
            id: '1234',
            name: 'Jane Doe',
            email: 'janedoe@gmail.com',
            phone: '123456789',
            password: '11111',
        });
        expect(mockUsersService.create).toHaveBeenCalledWith(dto);
        expect(mockUsersService.create).toHaveBeenCalledTimes(1);
    });

    it('should find all users', async () => {
    
        const result = await controller.findAll();
    
        expect(result).toEqual([
            {
                id: '1', name: 'User 1', email: 'user1@example.com', phone: '123456789', password: '11111', role: Role.USER,
                projects: []
            },
            {
                id: '2', name: 'User 2', email: 'user2@example.com', phone: '987654321', password: '22222',
                role: Role.USER, projects: []
            },
        ]);
        expect(mockUsersService.findAll).toHaveBeenCalled();
    });

    it('should find one user', () => {

        const result = controller.findOne('1');
        expect(result).toEqual({
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            phone: '123456789',
            password: 'password',
            role: Role.USER,
            projects: []
        });
        expect(mockUsersService.findOne).toHaveBeenCalledWith('1');

    });

});