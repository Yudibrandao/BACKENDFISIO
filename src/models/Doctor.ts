import { Entity,Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity, OneToMany } from "typeorm"
import { User } from "./User"
import { Cita } from "./Cita"

@Entity('doctores')
export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({name:"user_id"})
    userID!: number;

    @Column({name:"especialidad"})
    especialidad!: string;

    @Column({name:"estilo"})
    estilo!: string;


   // Relación: Doctor {1}--{1} User
   @OneToOne(() => User, (user) => user.id)
   @JoinColumn({ name: "user_id" })
   user!: User;

   // Relación: Doctor {1}--{0..n} Citas
   @OneToMany(() => Cita, (cita) => cita.doctor)
   citas?: Cita[];
    
}