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

    @Column({ nullable: false })
    password: string;
    
    @Column({ nullable: false, default: 'user' })
    role: string;
}
