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

Object.seal(SchoolRepository);
