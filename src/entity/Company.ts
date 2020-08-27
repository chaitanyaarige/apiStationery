import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn, Double, OneToMany, OneToOne, Timestamp } from "typeorm";

@Entity("company")
export class Company {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({name:"name"})
  name: string;

  @Column({name:"address"})
  address: string;

  @Column({name:"city"})
  city: string;

  // @Column("int",{array: true, name:"product_category"})
  // product_category: [];

  // @Column({name: "sizes", type: 'jsonb', nullable: true })
  // sizes: Object;

  @Column({nullable: true, name:"phone"})
  phone: number;

  @Column('timestamp')
  created_at: Timestamp;
}
