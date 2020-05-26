import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRole } from "./userRole.enum";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;
}