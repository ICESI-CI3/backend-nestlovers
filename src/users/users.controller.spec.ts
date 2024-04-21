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
});