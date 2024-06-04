import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Phase } from "src/common/enums/phase.enum";

export class CreateDocumentDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
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
