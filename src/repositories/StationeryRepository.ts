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

  async editOne(data: Stationery) {
    return await this.dao
    .createQueryBuilder("stationery")
    .update(Stationery)
    .set({ prod_name: data.prod_name , prod_code: data.prod_code,
      manufacturer: data.manufacturer, pre_gst: data.pre_gst,
      unit_price: data.unit_price, updated_at: data.updated_at})
    .where("id = :id", { id: data.id })
    .execute();
  }

  async delete(id: any) {
    return await this.dao
    .createQueryBuilder()
    .delete()
    .from(Stationery)
    .where("id = :id", { id: id })
    .execute();
  }

  async findOne(data: any) {
    return await this.dao.findOne(data, {
      where: {},
    });
  }
}

Object.seal(StationeryRepository);
