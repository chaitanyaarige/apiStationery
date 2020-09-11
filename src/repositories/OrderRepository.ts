import { getRepository, Repository } from "typeorm";
import { Order } from "../entity/Order";

export class OrderRepository {
  private dao: Repository<Order>;

  constructor() {
    this.dao = getRepository(Order);
  }

  async search(data: any) {
    return await this.dao
      .createQueryBuilder("order")
      .where(data)
      .getMany();
  }

  async saveOne(data: Order) {
    return await this.dao.save(data);
  }

  async findAll() {
    return await this.dao.find();
  }

  // async editOne(data: Order) {
  //   return await this.dao
  //   .createQueryBuilder("order")
  //   .update(Order)
  //   .set({ name: data.name , address: data.address, phone: data.phone, city: data.city,})
  //   .where("id = :id", { id: data.id })
  //   .execute();
  // }

  // async delete(id: any) {
  //   return await this.dao
  //   .createQueryBuilder()
  //   .delete()
  //   .from(Order)
  //   .where("id = :id", { id: id })
  //   .execute();
  // }

  async findOne(data: any) {
    return await this.dao.findOne(data, {
      where: {},
    });
  }
}

Object.seal(OrderRepository);
