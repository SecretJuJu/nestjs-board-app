import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.createUser(createUserDto);
    return newUser;
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.getUserByUsername(username);
  }
}
