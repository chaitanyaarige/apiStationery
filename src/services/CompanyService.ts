import { Company } from "../entity/Company";
import { CompanyRepository } from "../repositories/CompanyRepository";

export class CompanyService {
  public sessionInfo: any;
  private companyRepository: CompanyRepository;
  isUpdate: boolean = false;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async search(item: any) {
    try {
      let data: any = await this.companyRepository.search(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      let data: any = await this.companyRepository.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: Company) {
    try {
      let data: any = await this.companyRepository.findOne(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editOne(datas: Company) {
    try {
      let data: any = await this.companyRepository.editOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: Company) {
    try {
      let data: any = await this.companyRepository.delete(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveOne(datas: Company) {
    try {
      let data: any = await this.companyRepository.saveOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
