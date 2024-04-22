import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { usersSeed } from './data/users.seed';
import { User } from '../users/entities/user.entity';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class SeedService {

    private superadminUserToken: { token: string };

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {}

    /**
     * Populate the database with seed data.
     * 
     * @returns A message indicating that the database has been populated successfully.
     */
    populateDB() {
        this.loginSuperAdmin();

        this.registerUsersWithSeedData();

        return 'Database populated successfully';
    }

    /**
     * Login the superadmin user to get its token.
     */
    private async loginSuperAdmin() {
        const superAdminCredentials = {
            "email": "admin@test.com",
            "password": "Soyeljefazo1"
        };

        this.superadminUserToken = await this.authService.login(superAdminCredentials);
    }

    /**
     * Register the users with the seed data.
     */
    private async registerUsersWithSeedData() {
        await this.authService.registerUsersWithSeedData(usersSeed);

        const roleAdminAssignment = { "role": Role.ADMIN }
        const seedAdminUser = await this.userService.findOneByEmail(usersSeed[0].email);

        this.userService.assignRole(seedAdminUser.id, roleAdminAssignment);
    }
}
