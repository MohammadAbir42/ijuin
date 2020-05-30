import { BaseEntity, Entity, Column, CreateDateColumn, PrimaryColumn, Unique, OneToOne, JoinColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { UserRole } from "src/auth/userRole.enum";
import { User } from "src/auth/user.entity";

@Entity()
@Unique(['username', 'id', 'email'])
export class UserData extends BaseEntity {

    @CreateDateColumn({ type: 'date' })
    @PrimaryColumn()
    createdAt: Date

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    cover: string;

    @Column({ nullable: true })
    about: string;

    @Column({ nullable: true })
    intro: string;

    @Column({ nullable: true })
    gender: Gender;

    @Column({ nullable: true })
    contactInfo: string;

    @Column({ nullable: true })
    place: string;

    @Column({ type: 'text', array: true, nullable: true })
    shortcuts: string[];

    @Column({type: 'json', nullable: true})
    socialLinks: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
    };
    
    @OneToOne(type => User, user => user.userData)
    @JoinColumn()
    user: User;

    @Column()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    role: UserRole;

}