import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserDto } from '../src/user/user.dto';
import * as cookieParser from 'cookie-parser';

const mockUserRecord: UserDto = {
  docType: 'user',
  username: 'testUsername',
  nama_lengkap: 'test nama lengkap',
  password: '123456',
  nip: '12341242141211421',
  jabatan: 'Admin',
};

const mockUserState = {
  Key: 'thisiskey',
  Record: mockUserRecord,
};

const jwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NjBjNWI4MC1lMThmLTExZWItODZlMy03NWI1ODU0OGIxN2EiLCJyb2xlIjoiQWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjI1OTMzMDQyfQ.i6iCXzOaH2M-4S-zze2zkfZwVC0ZW2YR_MHo6w2QpOM';

jest.setTimeout(40000);

describe('End to End Testing REST Api with Hyperledger Fabric', () => {
  let app: INestApplication;
  let firstUserState: { Key: string; Record: UserDto };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(cookieParser());

    await app.init();
    await new Promise((resolve) => {
      setTimeout(resolve, 10000);
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Module', () => {
    afterAll(async () => {
      const response = await request(app.getHttpServer())
        .get('/api/user')
        .set('cookie', `Authentication=${jwtToken}`);
      if (!response.body.data.length) return;
      await Promise.all(
        response.body.data.map(async (user) => {
          return request(app.getHttpServer())
            .delete(`/api/user/${user.Key}`)
            .set('cookie', `Authentication=${jwtToken}`);
        }),
      );
    });

    it('/api/user (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user')
        .set('cookie', `Authentication=${jwtToken}`)
        .send(mockUserRecord)
        .expect(201);

      expect(response.body.message).toEqual('Data berhasil ditambahkan.');
    });

    it('/api/user (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/user')
        .set('cookie', `Authentication=${jwtToken}`)
        .expect(200);

      firstUserState = response.body.data[0];

      expect(response.body.data).toHaveLength(1);
    });

    it('/api/user/:key (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/user/${firstUserState.Key}`)
        .set('cookie', `Authentication=${jwtToken}`)
        .expect(200);

      expect(response.body.data).toEqual({
        ...mockUserRecord,
        password: expect.any(String),
      });
    });

    it('/api/user/:key (PUT)', async () => {
      const response = await request(app.getHttpServer())
        .put(`/api/user/${firstUserState.Key}`)
        .set('cookie', `Authentication=${jwtToken}`)
        .send(mockUserRecord)
        .expect(200);

      expect(response.body.data).toEqual({});
      expect(response.body.message).toEqual('Data berhasil diperbarui.');
    });

    it('/api/user/:key (DELETE)', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/user/${firstUserState.Key}`)
        .set('cookie', `Authentication=${jwtToken}`)
        .expect(200);

      expect(response.body.data).toEqual({});
      expect(response.body.message).toEqual('Data berhasil dihapus.');
    });
  });
});
