import { getRepository, Repository } from "typeorm";
import { School } from "../entity/School";

export class SchoolRepository {
  private dao: Repository<School>;

  constructor() {
    this.dao = getRepository(School);
  }

  async search(data: any) {
    return await this.dao
      .createQueryBuilder("school")
      .where(data)
      .getMany();
  }

  async saveOne(data: School) {
    return await this.dao.save(data);
  }

  async editOne(data: School) {
    return await this.dao
    .createQueryBuilder("school")
    .update(School)
    .set({ name: data.name , address: data.address, phone: data.phone, city: data.city,})
    .where("id = :id", { id: data.id })
    .execute();
  }

  async findAll() {
    return await this.dao.find();
  }

  async delete(id: any) {
    return await this.dao
    .createQueryBuilder()
    .delete()
    .from(School)
    .where("id = :id", { id: id })
    .execute();
  }

  async findOne(data: any) {
    return await this.dao.findOne(data, {
      where: {},
    });
  }
}

Object.seal(SchoolRepository);
