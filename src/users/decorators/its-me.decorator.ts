import { UseGuards, applyDecorators } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorators";
import { Role } from "src/common/enums/rol.enum";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";
import { ItsMeGuard } from "../guard/its-me.guard";

/**
 * Create a new decorator called AuthIsMe that takes an array of roles as an argument. This decorator will apply the Roles, UseGuards, and ItsMeGuard decorators to the route handler.
 * 
 * The main idea is to create a decorator that allows us to apply many decorators at once. This way, we can avoid repeating the same decorators in multiple routes.
 * 
 * @param roles The roles that are allowed to access the route.
 * @returns The applied decorators.
 */
export function AuthIsMe(roles: Role[]) {
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard, ItsMeGuard),
    );
}

// export function ApplyManyDecorators(decorators: ClassDecorator[], guards: ClassDecorator[]) {
//     return applyDecorators(
//         ...decorators,
//         UseGuards(...guards),
//     );
// }