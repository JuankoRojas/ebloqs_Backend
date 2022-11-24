import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProyectsFeatured {
    @PrimaryColumn()
    id_proyect: string;

    @Column({ type: 'varchar', nullable: true })
    token: string;

    @Column({ type: 'varchar', nullable: true })
    status: string;

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
