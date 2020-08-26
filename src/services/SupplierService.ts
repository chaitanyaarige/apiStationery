import { Supplier } from "../entity/Supplier";
import { SupplierRepository } from "../repositories/SupplierRepository";

export class SupplierService {
  public sessionInfo: any;
  private supplierRepository: SupplierRepository;
  isUpdate: boolean = false;

  constructor() {
    this.supplierRepository = new SupplierRepository();
  }

  async search(item: any) {
    try {
      let data: any = await this.supplierRepository.search(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      let data: any = await this.supplierRepository.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveOne(datas: Supplier) {
    try {
      let data: any = await this.supplierRepository.saveOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
