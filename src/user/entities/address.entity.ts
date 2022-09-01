import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: false })
    country: string;

    @Column({ type: 'varchar', nullable: false })
    city: string;

    @Column({ type: 'varchar', nullable: false })
    address1: string;

    @Column({ nullable: true })
    postalCode: number;

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
