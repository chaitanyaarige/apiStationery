import { Router, Request, Response } from "express";
import { OrdersService } from "../services/OrdersService"

export class OrdersControllers {
  private componentName: string = "OrdersControllers";
  private router: Router = Router();
  private service: any = new OrdersService();

  getRouter(): Router {
    this.router.get("/", async (request: Request, response: Response) => {
      try {
        let orders = await this.service.findAll();
        response.send({ status: 1, data: orders });
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
        let orders = await this.service.saveOne(reqData);
        response.send({ status: 1, data: orders });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    return this.router;
  }
}
