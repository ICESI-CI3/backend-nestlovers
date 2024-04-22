import { ProjectType } from "../../common/enums/project-type.enum";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    readonly id: string;

    @Column({ nullable: false })
    readonly name: string;

    @Column({ nullable: false })
    readonly description: string;

    @Column({ type: 'enum', nullable: false, enum: ProjectType })
    readonly type: ProjectType;

    @Column({ nullable: false })
    readonly creatorId: number;

    @ManyToOne(() => User, user => user.projects)
    @JoinColumn({ name: 'creatorId' })
    creator: User;
}
