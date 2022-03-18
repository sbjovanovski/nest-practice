import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333');

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('SignUp', () => {
      it('should sign up', () => {
        const dto: AuthDto = {
          password: 'pero',
          email: 'mrle.123@pero.com'
        };
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('SignIn', () => {
      it('should sign in', () => {

      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {

    });
    describe('Edit user', () => {

    });
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {

    });
    describe('Get bookmarks', () => {

    });
    describe('Get bookmark by id', () => {

    });
    describe('Edit bookmark', () => {

    });
    describe('Delete bookmark', () => {

    });
  });
});