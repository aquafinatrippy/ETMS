import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from 'bcryptjs'
import {TimeLog} from "./timelog";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!: string;

    @Column()
    name!: string

    @Column()
    surname!: string;

    @Column()
    password!: string

    @OneToMany(() => TimeLog, (timelog) => timelog)
    timelogs?: TimeLog[]


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @BeforeInsert()
    async hashPassword(){
        if(this.password){
            this.password = await bcrypt.hash(this.password, 8)
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}