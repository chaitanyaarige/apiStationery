import { getRepository, Repository } from "typeorm";
import { Orders } from "../entity/Orders";

export class OrdersRepository {
  private dao: Repository<Orders>;

  constructor() {
    this.dao = getRepository(Orders);
  }

  async search(data: any) {
    return await this.dao
      .createQueryBuilder("orders")
      .where(data)
      .getMany();
  }

  async saveOne(data: Orders) {
    return await this.dao.save(data);
  }

  async findAll() {
    return await this.dao.find();
  }

  async delete(data: any) {
    data.active = !data.active;
    return await this.dao.save(data);
  }

  async findOne(data: any) {
    return await this.dao.findOne(data, {
      where: {},
    });
  }
}

Object.seal(OrdersRepository);
