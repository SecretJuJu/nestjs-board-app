import { EntityRepository, Repository } from 'typeorm';
import { createHashedPassword } from '../utils/user';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const user = new User();
    user.username = username;
    user.password = createHashedPassword(password);

    await user.save();

    return user;
  }

  async getUserByUsername(username: string) {
    return await User.findOne({ username: username });
  }
}
