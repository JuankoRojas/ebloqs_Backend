import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProyectsData {
    @PrimaryColumn()
    id_proyect: string;

    @Column({ type: 'varchar', nullable: true })
    surface_building: string;

    @Column({ type: 'varchar', nullable: true })
    number_departaments: string;

    @Column({ type: 'varchar', nullable: false })
    number_amenities: string;

    @Column({ type: 'varchar', nullable: false })
    escrow: string;

    @Column({ type: 'varchar', nullable: false })
    approved_plans: string;

    @Column({ type: 'varchar', nullable: true })
    construction_license: string;

    @Column({ type: 'varchar', nullable: true })
    builder_data: string;

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
