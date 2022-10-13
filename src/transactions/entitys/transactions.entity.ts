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

    @Column({ type: 'varchar', nullable: false })
    customer_name: string;
    
    @Column({ type: 'varchar', nullable: false })
    payment_number: string;

    @Column({ type: 'varchar', nullable: true })
    type: string;

    @Column({ type: 'varchar', nullable: true, default : 0 })
    status: number;

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
