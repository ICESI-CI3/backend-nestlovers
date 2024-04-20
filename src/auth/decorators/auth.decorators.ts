import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { Roles } from "./roles.decorators";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

/**
 * Create a new decorator called Auth that takes an array of roles as an argument. This decorator will apply the Roles and UseGuards decorators to the route handler.
 * 
 * The main idea is to create a decorator that allows us to apply many decorators at once. This way, we can avoid repeating the same decorators in multiple routes.
 * 
 * @param roles The roles that are allowed to access the route.
 * @returns The applied decorators.
*/
export function Auth(roles: Role[]) {
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard),
    );
}