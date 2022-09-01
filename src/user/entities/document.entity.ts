import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Documents {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: false })
    type: string;

    @Column({ array: false, type: 'varchar', })
    documentURL: string[];

    @Column({ type: 'varchar', nullable: true })
    ownerID: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    create: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    update: Date;
}
