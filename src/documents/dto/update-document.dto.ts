import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './create-document.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Phase } from 'src/common/enums/phase.enum';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsString()
    readonly phase: Phase;
    
    @IsNotEmpty()
    @IsNumber()
    readonly part: number;

    @IsNotEmpty()
    @IsString()
    readonly content: string;

    @IsNotEmpty()
    @IsNumber()
    readonly progressPercentage: number;
}
