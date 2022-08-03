import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    email: string;

    @Column({ array: false, type: 'varchar', nullable: true })
    deviceID: string[];

    @Column({ type: 'varchar', nullable: true })
    type_acount: string;

    @Column({ type: 'bool', nullable: true })
    email_verificated: boolean;

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
