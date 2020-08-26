import { Products } from "../entity/Products";
import { ProductsRepository } from "../repositories/ProductsRepository";

export class ProductsService {
  public sessionInfo: any;
  private productsRepository: ProductsRepository;
  isUpdate: boolean = false;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async search(item: any) {
    try {
      let data: any = await this.productsRepository.search(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      let data: any = await this.productsRepository.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: Products) {
    try {
      let data: any = await this.productsRepository.findOne(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveOne(datas: Products) {
    try {
      let data: any = await this.productsRepository.saveOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
