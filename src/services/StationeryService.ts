import { Stationery } from "../entity/Stationery";
import { StationeryRepository } from "../repositories/StationeryRepository";

export class StationeryService {
  public sessionInfo: any;
  private stationeryRepository: StationeryRepository;
  isUpdate: boolean = false;

  constructor() {
    this.stationeryRepository = new StationeryRepository();
  }

  async search(item: any) {
    try {
      let data: any = await this.stationeryRepository.search(item);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      let data: any = await this.stationeryRepository.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: Stationery) {
    try {
      let data: any = await this.stationeryRepository.findOne(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async editOne(datas: Stationery) {
    try {
      let data: any = await this.stationeryRepository.editOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id: Stationery) {
    try {
      let data: any = await this.stationeryRepository.delete(id);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveOne(datas: Stationery) {
    try {
      let data: any = await this.stationeryRepository.saveOne(datas);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
