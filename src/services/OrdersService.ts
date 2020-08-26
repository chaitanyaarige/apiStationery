import { Orders } from "../entity/Orders";
import { OrdersRepository } from "../repositories/OrdersRepository";

export class OrdersService {
  public sessionInfo: any;
  private ordersRepository: OrdersRepository;
  isUpdate: boolean = false;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  async search(item: any) {
    try {
      let data: any = await this.ordersRepository.search(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      let data: any = await this.ordersRepository.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveOne(datas: Orders) {
    try {
      let data: any = await this.ordersRepository.saveOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
