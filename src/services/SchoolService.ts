import { School } from "../entity/School";
import { SchoolRepository } from "../repositories/SchoolRepository";

export class SchoolService {
  public sessionInfo: any;
  private schoolRepository: SchoolRepository;
  isUpdate: boolean = false;

  constructor() {
    this.schoolRepository = new SchoolRepository();
  }

  async search(item: any) {
    try {
      let data: any = await this.schoolRepository.search(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      let data: any = await this.schoolRepository.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: School) {
    try {
      let data: any = await this.schoolRepository.findOne(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editOne(datas: School) {
    try {
      let data: any = await this.schoolRepository.editOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: School) {
    try {
      let data: any = await this.schoolRepository.delete(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveOne(datas: School) {
    try {
      let data: any = await this.schoolRepository.saveOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
