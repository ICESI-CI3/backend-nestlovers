import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentDto {
    // @IsNotEmpty()
    // @IsProjectExists()
    // readonly projectId: string;

    @IsNotEmpty()
    @IsString()
    readonly content: string;
}
