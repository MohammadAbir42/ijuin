import { BaseEntity, Entity, CreateDateColumn, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Story extends BaseEntity {
    @CreateDateColumn({ type: 'date' })
    @PrimaryColumn()
    created: Date;

    @Column()
    creator: string;

    @Column()
    text: string;

    @Column()
    images: string;

    @Column()
    videos: string;

    @Column()
    comments: string; // from comment table

    @Column()
    id: string; // from userData table

}