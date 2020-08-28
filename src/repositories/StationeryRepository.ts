import { getRepository, Repository } from "typeorm";
import { Stationery } from "../entity/Stationery";

export class StationeryRepository {
  private dao: Repository<Stationery>;

  constructor() {
    this.dao = getRepository(Stationery);
  }

  async search(data: any) {
    return await this.dao
      .createQueryBuilder("stationery")
      .where(data)
      .getMany();
  }

  async saveOne(data: Stationery) {
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

Object.seal(StationeryRepository);
