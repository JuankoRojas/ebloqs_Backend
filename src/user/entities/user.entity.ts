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

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    deviceID: string;

    @Column()
    photoURL: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    create: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    update: Date;
}
