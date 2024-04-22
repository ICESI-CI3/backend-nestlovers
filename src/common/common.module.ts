import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';

dotenv.config();

  @Module({
    imports: [
      JwtModule.registerAsync({
        imports: [ConfigModule],

        useFactory: async (configService: ConfigService) => ({
          secret: process.env.SECRET_KEY,
          global: true,
          signOptions: { expiresIn: '1d' },
        }),
      }),
    ],
  controllers: [],
  providers: [],
  exports: [JwtModule],
})
export class CommonModule {}
