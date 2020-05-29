import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserRole } from "./userRole.enum";


@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    email: string

    @Column()
    username: string; 

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    role: UserRole;


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}