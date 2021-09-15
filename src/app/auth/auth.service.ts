import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { checkPassword } from '../utils/user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUserDto);
    const { id: userId } = createdUser;
    return userId;
  }

  async validateUser(username, password) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (checkPassword(password, user.password)) {
      return 'return login success';
    } else {
      throw new UnauthorizedException();
    }
  }
}
