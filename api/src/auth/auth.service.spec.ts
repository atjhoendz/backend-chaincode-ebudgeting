import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from 'src/config/configuration';
import { UserDto } from 'src/user/user.dto';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import * as bcrypt from 'bcrypt';

const mockUserData: UserDto = {
  docType: 'user',
  username: 'testUsername',
  nama_lengkap: 'test nama lengkap',
  password: '123456',
  nip: '12341242141211421',
  jabatan: 'Admin',
};

const mockStateUser = {
  Key: 'keyState',
  Record: mockUserData,
};

const mockUserService = {
  findByQuery: jest.fn(),
};

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let bcryptCompare: jest.Mock;

  beforeEach(async () => {
    bcryptCompare = jest.fn();
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        JwtModule.registerAsync({
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
            signOptions: {
              expiresIn: configService.get<string>(
                'JWT_ACCESS_TOKEN_EXPIRES_TIME',
              ),
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshTokenStrategy,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Validate User', () => {
    describe('If user and password is valid', () => {
      const arrData: Array<any> = [mockStateUser];
      beforeEach(() => {
        bcryptCompare.mockResolvedValue(true);
        mockUserService.findByQuery.mockResolvedValue(JSON.stringify(arrData));
      });
      it('should return user state data', async () => {
        const result = await service.validateUser(
          mockUserData.username,
          mockUserData.password,
        );

        expect(result).toEqual({
          Key: expect.any(String),
          Record: {
            jabatan: expect.any(String),
            username: expect.any(String),
          },
        });
      });
    });

    describe('If user is not exist', () => {
      beforeEach(() => {
        mockUserService.findByQuery.mockResolvedValue(JSON.stringify([]));
      });
      it('should return null', async () => {
        const result = await service.validateUser(
          expect.any(String),
          expect.any(String),
        );
        expect(result).toEqual(null);
      });
    });

    describe('If password is invalid', () => {
      beforeEach(() => {
        mockUserService.findByQuery.mockResolvedValue(
          JSON.stringify([mockStateUser]),
        );
        bcryptCompare.mockResolvedValue(false);
      });
      it('should return null', async () => {
        const result = await service.validateUser(
          expect.any(String),
          expect.any(String),
        );
        expect(result).toEqual(null);
      });
    });
  });

  describe('Password validation', () => {
    describe('If password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockResolvedValue(true);
      });
      it('should return true', async () => {
        const result = await service.isPasswordValid(
          expect.any(String),
          expect.any(String),
        );
        expect(result).toEqual(true);
      });
    });

    describe('If password is invalid', () => {
      beforeEach(() => {
        bcryptCompare.mockResolvedValue(false);
      });
      it('should return false', async () => {
        const result = await service.isPasswordValid(
          expect.any(String),
          expect.any(String),
        );
        expect(result).toEqual(false);
      });
    });
  });

  describe('Get Cookie With JWT Access Token', () => {
    it('should return accesstoken and accesstoken string', async () => {
      const result = service.getCookieWithJwtAccessToken(mockStateUser);

      expect(result).toEqual({
        accessToken: expect.any(String),
        accessTokenCookie: expect.any(String),
      });
    });
  });

  describe('Get Cookie With JWT Refresh Token', () => {
    it('should return refreshtoken and refreshtoken cookie string', async () => {
      const result = service.getCookieWithJwtRefreshToken(mockStateUser);

      expect(result).toEqual({
        refreshToken: expect.any(String),
        refreshTokenCookie: expect.any(String),
      });
    });
  });

  describe('Get Cookie For Logout', () => {
    it('should an array of cookie string with empty value', async () => {
      const result = service.getCookieForLogOut();
      expect(result).toEqual(expect.any(Array));
    });
  });
});
