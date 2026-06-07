import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { UserRole } from '../enums/user.role';
export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  fullName: string;
  @IsEnum(UserRole)
  role: Number;
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
