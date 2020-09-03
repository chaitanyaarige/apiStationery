import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn, Double, OneToMany, OneToOne, Timestamp } from "typeorm";

@Entity("company")
export class Company {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({name:"name"})
  name: string;

  @Column({name:"address", nullable: true})
  address: string;

  @Column({name:"city"})
  city: string;

  @Column({name:"phone"})
  phone: string;

  @Column('timestamp')
  created_at: Timestamp;
}
