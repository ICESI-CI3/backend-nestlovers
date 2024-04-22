import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ProjectType } from "../../common/enums/project-type.enum";

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsEnum(ProjectType)
    readonly type: ProjectType;
}
