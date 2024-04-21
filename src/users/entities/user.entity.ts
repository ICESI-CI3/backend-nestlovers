import { Role } from '../../common/enums/rol.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity({ name: 'users' })
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: false, select: false })
    password: string;
    
    @Column({ type: 'enum', nullable: false, default: Role.USER, enum: Role })
    role: Role;
}
