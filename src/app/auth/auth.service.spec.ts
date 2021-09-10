import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v1 as uuid } from 'uuid';

import { User } from './user.entity';
import { createHashedPassword } from '../utils/user';

const tmpUserInfo = {
  username: 'testuser1',
  password: 'imtestuser1password',
};

class MockUserRepository {
  private users = new Map<string, User>();
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const newUserId = uuid();

    const newUser: User = new User();
    newUser.id = newUserId;
    newUser.username = username;
    newUser.password = await createHashedPassword(password);

    this.users.set(newUserId, newUser);

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
          provide: getRepositoryToken(User),
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
  });
});
