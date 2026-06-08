import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redis = new Redis({
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    });
    redis.on('connect', () => {
      console.log('Redis Connected');
    });
    redis.on('error', (error) => {
      console.log('Redis Disconnected', error);
    });
    return redis;
  },
};
