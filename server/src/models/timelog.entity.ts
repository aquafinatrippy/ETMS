import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./user.entity";


@Entity()
export class TimeLog {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    description!: string;

    @Column({type: "timestamptz"})
    start!: Date

    @Column({nullable: true, type: "timestamptz", default: null})
    end?: Date;

    @Column({ name: 'userId' })
    userId!: string;


    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "userId"})
    user?: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}