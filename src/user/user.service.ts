import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'generated/prisma';
import type { RegisterUserDto } from 'src/auth/dtos/register.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(data: RegisterUserDto): Promise<User | null> {
    return this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        avatarUrl: data.avatarUrl,
      },
    });
  }
  findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    // console.log(user)
    // if (!user) {
    //     throw new UnauthorizedException("User not Found")
    // }
  }
}
