import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne } from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserRole } from "./userRole.enum";
import { UserData } from "src/user-data/userData.entity";


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

    @OneToOne(type => UserData, userData => userData.user)
    userData: UserData


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }
}