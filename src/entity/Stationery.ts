import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn, Double, OneToMany, OneToOne, Timestamp } from "typeorm";

@Entity("stationery")
export class Stationery {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({name:"prod_code"})
  prod_code: string;

  @Column({name:"prod_name"})
  prod_name: string;

  @Column({name:"manufacturer"})
  manufacturer: string;

  @Column({nullable: true, name:"pre_gst"})
  pre_gst: number;

  @Column({nullable: true, name:"post_gst"})
  post_gst: number;

  // @Column("int",{array: true, name:"product_category"})
  // product_category: [];

  // @Column({name: "sizes", type: 'jsonb', nullable: true })
  // sizes: Object;

  @Column({name:"unit_price", type: "decimal", precision: 2, scale: 2,})
  unit_price: number;

  @Column('timestamp')
  created_at: Timestamp;
}
