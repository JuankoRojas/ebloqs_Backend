import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transactions {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    customer: string;

    @Column({ type: 'varchar', nullable: true })
    receiver: string;

    @Column({ type: 'varchar', nullable: true })
    amount: string;

    @Column({ type: 'varchar', nullable: true })
    type: string;

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
