import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEnt {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar' })
    email: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    birthdayDate: Date;

    @Column({ type: 'text', nullable: true })
    typeAccount: string;

    @Column({ array: false, type: 'varchar' })
    deviceID: string;

    @Column({ type: 'bool', nullable: true })
    emailVerificated: boolean;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    idRef: string;

    @Column({ type: 'bool', nullable: true, default: true })
    status: boolean;

    @Column({ type: 'varchar', nullable: true })
    verify: boolean;

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
