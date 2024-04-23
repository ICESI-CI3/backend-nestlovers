import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";
import { Role } from "src/common/enums/rol.enum";
import { OwnDocumentGuard } from "../guard/own-document.guard";
import { Roles } from "src/common/decorators/roles.decorators";

/**
 * Create a new decorator called AuthOwnDocument that takes an array of roles as an argument. This decorator will apply the Roles, UseGuards, and OwnDocumentGuard decorators to the route handler.
 * 
 * The main idea is to create a decorator that allows us to apply many decorators at once. This way, we can avoid repeating the same decorators in multiple routes.
 * 
 * @param roles The roles that are allowed to access the route.
 * @returns The applied decorators.
 */
export function AuthOwnDocument(roles: Role[]) {
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard, OwnDocumentGuard),
    );
}