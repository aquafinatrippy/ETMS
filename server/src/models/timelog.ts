import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./user";


@Entity()
export class TimeLog {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    description!: string;

    @Column()
    start!: Date

    @Column()
    end?: Date;

    @ManyToOne(() => User, user => user.timelogs)
    user?: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}