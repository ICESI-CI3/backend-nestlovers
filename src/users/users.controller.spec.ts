import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => { 
    let controller: UsersController;

    const mockUsersService = {

        create: jest.fn((dto) => ({...dto})),
        findOneByEmail: jest.fn((dto) => ({...dto})),
        findByEmailWithPassword: jest.fn((dto) => ({...dto})),
        findAll: jest.fn((dto) => ({...dto})),
        findOne: jest.fn((dto) => ({...dto})), 
        update: jest.fn((dto) => ({...dto})),
        remove: jest.fn((dto) => ({...dto})),

    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],  
        }).overrideProvider(UsersService).useValue(mockUsersService).compile();

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

});