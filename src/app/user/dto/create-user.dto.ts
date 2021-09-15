import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
