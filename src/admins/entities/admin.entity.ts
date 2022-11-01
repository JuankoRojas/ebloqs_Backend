import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AdminEnt {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    lastname: string;

    @Column({ type: 'varchar' })
    email: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    birthdayDate: Date;

    @Column({ type: 'varchar', default: 2 })
    rol: string;

    @Column({ array: false, type: 'varchar' })
    password: string;

    @Column({ type: 'bool', nullable: true, default: true })
    status: boolean;

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
