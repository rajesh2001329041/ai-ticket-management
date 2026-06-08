import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register.user.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcryptjs';
import { UserLoginDto } from './dtos/user.login.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async createUser(data: RegisterUserDto) {
    //check the mail uniqueness

    //hash the password
    data.password = await bcrypt.hash(data.password, 12);

    return this.userService.createUser(data);
    // send welocome mail  to the use
  }
  async login(data: UserLoginDto) {
    // console.log(data)
    const user = await this.userService.findUserByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');
    const { password, ...response } = user;
    const tokenPaylod = { sub: response.id };
    const accessToken = await this.jwtService.signAsync(tokenPaylod);
    const refreshToken = await this.jwtService.signAsync(tokenPaylod, {
      expiresIn: '7d',
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
    // store  refresh  token  in  redis
    await this.redisService.set(`refresh:${response.id}`, refreshToken, 604800);
    return {
      accessToken,
      refreshToken,
      ...response,
    };
  }
}
