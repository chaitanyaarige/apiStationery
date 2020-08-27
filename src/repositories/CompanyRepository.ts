import { getRepository, Repository } from "typeorm";
import { Company } from "../entity/Company";

export class CompanyRepository {
  private dao: Repository<Company>;

  constructor() {
    this.dao = getRepository(Company);
  }

  async search(data: any) {
    return await this.dao
      .createQueryBuilder("company")
      .where(data)
      .getMany();
  }

  async saveOne(data: Company) {
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

Object.seal(CompanyRepository);
