import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  const tmpUser: CreateUserDto = {
    username: 'testuser1',
    password: 'testuser1password',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: UserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser test', () => {
    it('normal createUser test', async () => {
      tmpUser['id'] = await userService.createUser(tmpUser);
    });
  });
});
