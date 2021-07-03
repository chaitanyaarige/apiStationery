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

  async findOne(data: any) {
    return await this.dao.findOne(data, {
      where: {},
    });
  }
}

Object.seal(OrderRepository);
