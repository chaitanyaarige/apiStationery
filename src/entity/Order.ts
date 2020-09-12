import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn, Double, OneToMany, OneToOne, Timestamp } from "typeorm";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn({name:"id"})
  id: number;

  @Column({name:"invoice"})
  invoice: string;

  @Column({name:"buyer"})
  buyer: string;

  @Column({name:"hsncode"})
  hsncode: string;

  @Column({name:"isCash"})
  isCash: boolean;

  @Column({name: "products", type: 'jsonb' })
  products: Object;

  @Column('timestamp')
  created_at: Timestamp;
}
