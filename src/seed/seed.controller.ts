import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/common/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService
  ) {}

  /**
   * Populate the database with seed data.
   * 
   * @returns A message indicating that the database has been populated successfully.
   */
  @Get()
  @Auth([ Role.SUPER_ADMIN ])
  runSeed() {
    return this.seedService.populateDB();
  }
}
