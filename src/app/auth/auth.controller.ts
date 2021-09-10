import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async createUser(): Promise<void> {
    const createUserDto: CreateUserDto = {
      username: 'testuser1',
      password: 'testtesttest',
    };
    this.authService.createUser(createUserDto);
    return;
  }
}
