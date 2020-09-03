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

  async editOne(data: Company) {
    return await this.dao
    .createQueryBuilder("school")
    .update(Company)
    .set({ name: data.name , address: data.address, phone: data.phone, city: data.city,})
    .where("id = :id", { id: data.id })
    .execute();
  }

  async delete(id: any) {
    return await this.dao
    .createQueryBuilder()
    .delete()
    .from(Company)
    .where("id = :id", { id: id })
    .execute();
  }

  async findOne(data: any) {
    return await this.dao.findOne(data, {
      where: {},
    });
  }
}

Object.seal(CompanyRepository);
