import { Order } from "../entity/Order";
import { OrderRepository } from "../repositories/OrderRepository";

export class OrderService {
  public sessionInfo: any;
  private orderRepository: OrderRepository;
  isUpdate: boolean = false;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async search(item: any) {
    try {
      let data: any = await this.orderRepository.search(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      let data: any = await this.orderRepository.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: Order) {
    try {
      let data: any = await this.orderRepository.findOne(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveOne(datas: Order) {
    try {
      let data: any = await this.orderRepository.saveOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
