import { Phase } from "src/common/enums/phase.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    readonly id: string;

    @Column({ nullable: false })
    readonly name: string;

    @Column({ nullable: false, default: 0 })
    readonly progress_percentage: number;

    @Column({ type: 'enum', enum: Phase, nullable: false })
    readonly phase: Phase;

    @Column({ nullable: false })
    readonly part: number;

    // This column will contain all the information that the user writes.
    @Column({ type: 'text', nullable: false })
    readonly content: string;
}
