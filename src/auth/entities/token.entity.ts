import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    token: string;

    @Column({ nullable: false, type: 'timestamp' })
    expirationdate: Date;
}