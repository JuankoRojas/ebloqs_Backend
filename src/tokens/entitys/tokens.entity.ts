import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tokens {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    ebl_balance: string;

    @Column({ type: 'varchar', nullable: true })
    dollar_balance: string;

    @Column({ type: 'varchar', nullable: true })
    private_round: string;

    @Column({ type: 'varchar', nullable: true })
    ico_cost: string;
    
    @Column({ type: 'varchar', nullable: true })
    presale: string;

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
