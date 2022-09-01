import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PersonalInfo {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    lastname: string;

    @Column({ type: 'varchar', nullable: true })
    ownerID: string;

    @Column({ type: 'varchar', nullable: true })
    birthdayDate: string;

    @Column({ type: 'varchar', nullable: true })
    nacionality: string;

    @Column({ type: 'varchar', nullable: true })
    phoneNumber: string;

    @Column({ type: 'varchar', nullable: true })
    dniNumber: string;

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
