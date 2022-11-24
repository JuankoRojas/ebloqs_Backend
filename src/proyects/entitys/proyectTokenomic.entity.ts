import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProyectsTokenomic {
    @PrimaryColumn()
    id_proyect: string;

    @Column({ type: 'varchar', nullable: true })
    annual_rental: string;

    @Column({ type: 'varchar', nullable: true })
    construction_interest: string;

    @Column({ type: 'varchar', nullable: false })
    annual_expenditure: string;

    @Column({ type: 'varchar', nullable: false })
    net_leasing: string;

    @Column({ type: 'varchar', nullable: false })
    annual_net_profit: string;

    @Column({ type: 'varchar', nullable: true })
    plusvalia: string;

    @Column({ type: 'varchar', nullable: true })
    net: string;

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
