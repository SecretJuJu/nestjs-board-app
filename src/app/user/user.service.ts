import { ConflictException, Injectable } from '@nestjs/common';
import { createHashedPassword } from '../utils/user';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const user = new User();
    try {
      user.username = username;
      user.password = createHashedPassword(password);

      await user.save();
    } catch (err) {
      if (23505) {
        throw new ConflictException();
      } else {
        throw new Error();
      }
    }

    return user;
  }

  async getUserByUsername(username: string) {
    return await User.findOne({ username: username });
  }
}
