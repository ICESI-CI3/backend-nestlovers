import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

dotenv.config();

  @Module({
    imports: [
      forwardRef(() => AuthModule),
      // AuthModule,
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
