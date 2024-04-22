import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';
import { DocumentsModule } from 'src/documents/documents.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    UsersModule,
    DocumentsModule,
    ProjectsModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
