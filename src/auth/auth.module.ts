import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

dotenv.config();

  @Module({
    imports: [
      UsersModule,
      CommonModule,
      // JwtModule.registerAsync({
      //   imports: [ConfigModule],

      //   useFactory: async (configService: ConfigService) => ({
      //     secret: process.env.SECRET_KEY,
      //     global: true,
      //     signOptions: { expiresIn: '1d' },
      //   }),
      // }),
    ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
