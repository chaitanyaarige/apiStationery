import { Router, Request, Response } from "express";
import { StationeryService } from "../services/StationeryService"

export class StationeryControllers {
  private componentName: string = "StationeryControllers";
  private router: Router = Router();
  private service: any = new StationeryService();

  getRouter(): Router {
    this.router.get("/", async (request: Request, response: Response) => {
      try {
        let stationery = await this.service.findAll();
        response.send({ status: 1, data: stationery });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    this.router.post("/", async (request: Request, response: Response) => {
      try {
        let reqData: any;
        reqData = request.body ? request.body : {};
        this.service.sessionInfo = request.body.sessionInfo;
        let stationery = await this.service.saveOne(reqData);
        response.send({ status: 1, data: stationery });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    return this.router;
  }
}
