import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsEnum, IsString } from 'class-validator';
import { ProjectType } from 'src/common/enums/project-type.enum';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsEnum(ProjectType)
    readonly type: ProjectType;
}
