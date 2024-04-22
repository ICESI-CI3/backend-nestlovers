import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { usersSeed } from './data/users.seed';

@Injectable()
export class SeedService {

    constructor(
        private readonly authService: AuthService,
    ) {}

    populateDB() {
        this.authService.registerUsersWithSeedData(usersSeed);

        return 'Database populated successfully';
    }
}
