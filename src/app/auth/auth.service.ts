import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUserDto);
    const { id: userId } = createdUser;
    return userId;
  }
}
