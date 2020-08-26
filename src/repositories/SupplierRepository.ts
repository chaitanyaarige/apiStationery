import { getRepository, Repository } from "typeorm";
import { Supplier } from "../entity/Supplier";

export class SupplierRepository {
  private dao: Repository<Supplier>;

  constructor() {
    this.dao = getRepository(Supplier);
  }

  async search(data: any) {
    return await this.dao
      .createQueryBuilder("Supplier")
      .where(data)
      .getMany();
  }

  async saveOne(data: Supplier) {
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

Object.seal(SupplierRepository);
