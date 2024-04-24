import { IsEnum } from "class-validator";
import { Role } from "../../common/enums/rol.enum";

export class AssignRoleDto {
    @IsEnum(Role)
    readonly role: Role;
}