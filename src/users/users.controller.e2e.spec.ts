/**
 
import { UsersModule } from '../../src/users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import { Role } from '../common/enums/rol.enum';
import { AuthGuard } from '../common/guard/auth.guard';
import * as jwt from 'jsonwebtoken';

describe('UsersController (e2e)', () => {
    let guard: AuthGuard;
  let app: INestApplication;

  const mockUserRepository = {
    create: jest.fn((dto) => dto ),
    save: jest.fn((dto) => dto),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [{
        provide: AuthGuard,
        useValue: {
            canActivate: (context: ExecutionContext) => {
                const request = context.switchToHttp().getRequest();
                request.user = { name: 'admin1', role: Role.SUPER_ADMIN};
                return true;
            }
        }
      }]
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    guard = moduleFixture.get<AuthGuard>(AuthGuard);
    app = moduleFixture.createNestApplication();

   await app.init();
  });

  it('/users (POST)', async () => {

    const adminCredentials = {
        email: "admin@test.com",
        password: "Soyeljefazo1",
    };

    const response = await request(app.getHttpServer()).post('/auth/login').send(adminCredentials);
    const dto = {
        id: '1',
            name: 'Test User',
            email: 'test@example.com',
            phone: '123456789',
            password: 'password',
            role: Role.USER,
            projects: []
        };

        const adminToken = response.body.acces_token;
        
    
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send({ dto })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({dto});
      });
  });
});

*/

