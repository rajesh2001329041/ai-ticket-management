import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
// import { PrismaService } from './prisma/prisma.service';
import { RedisModule } from './redis/redis.module';
// import { RedisProvider } from './redis-provider/redis-provider';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
