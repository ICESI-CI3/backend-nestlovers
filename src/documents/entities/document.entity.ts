import { Phase } from "../../common/enums/phase.enum";
import { Project } from "../../projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false, default: 0 })
    progress_percentage: number;

    @Column({ type: 'enum', enum: Phase, nullable: false })
    phase: Phase;

    @Column({ nullable: false })
    part: number;

    // This column will contain all the information that the user writes.
    @Column({ type: 'text', nullable: false })
    content: string;

    @Column({ nullable: false })
    projectId: number;

    @ManyToOne(() => Project, project => project.documents)
    @JoinColumn({ name: 'projectId' })
    project: Project;
}
