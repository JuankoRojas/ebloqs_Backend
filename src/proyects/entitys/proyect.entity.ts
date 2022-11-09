import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Proyects {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    country: string;

    @Column({ type: 'varchar', nullable: true })
    type: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    token_price: string;

    @Column({ type: 'varchar', nullable: false })
    address: string;

    @Column({ type: 'varchar', nullable: true })
    tokens_emitted: string;

    @Column({ type: 'varchar', nullable: true })
    building_price: string;

    @Column({ type: 'varchar', nullable: true })
    tokens_available: string;

    @Column({ type: 'varchar', nullable: true })
    pic_1: string;

    @Column({ type: 'varchar', nullable: true })
    pic_2: string;

    @Column({ type: 'varchar', nullable: true })
    pic_3: string;

    @Column({ type: 'varchar', nullable: true })
    pic_4: string;

    @Column({ type: 'varchar', nullable: true })
    pic_5: string;

    @Column({ type: 'integer', nullable: true, default: 1 })
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
