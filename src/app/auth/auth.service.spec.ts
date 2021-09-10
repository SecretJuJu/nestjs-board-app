import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v1 as uuid } from 'uuid';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { createHashedPassword } from '../utils/user';
import { ConflictException } from '@nestjs/common';

const tmpUserInfo = {
  username: 'testuser1',
  password: 'imtestuser1password',
};

class MockUserRepository {
  private users = new Map<string, User>();
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    if (this.users.get(username) !== undefined) {
      throw new ConflictException();
    }

    const newUser: User = new User();
    newUser.id = uuid();
    newUser.username = username;
    newUser.password = createHashedPassword(password);

    this.users.set(username, newUser);

    return newUser;
  }
}

describe('board service test', () => {
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserRepository),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('create user', () => {
    it('normal user create', async () => {
      const newUserInfo: CreateUserDto = tmpUserInfo;
      const newUser = await authService.createUser(newUserInfo);

      expect(newUser.username).toEqual(tmpUserInfo.username);
    });

    it('create duplicate username', async () => {
      try {
        const newUserInfo: CreateUserDto = tmpUserInfo;
        await authService.createUser(newUserInfo);
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err instanceof ConflictException).toBeTruthy();
      }
    });
  });
});
