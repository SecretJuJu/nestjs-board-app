import { EntityRepository, Repository } from 'typeorm';
import { createHashedPassword } from '../utils/user';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const user = new User();
    user.username = username;
    user.password = createHashedPassword(password);

    await user.save();

    return user;
  }
}
