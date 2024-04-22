import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentDto {
    @IsNotEmpty()
    @IsString()
    readonly content: string;
}
