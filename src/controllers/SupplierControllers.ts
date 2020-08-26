import { Router, Request, Response } from "express";
import { SupplierService } from "../services/SupplierService"

export class SupplierControllers {
  private componentName: string = "SupplierControllers";
  private router: Router = Router();
  private service: any = new SupplierService();

  getRouter(): Router {
    this.router.get("/", async (request: Request, response: Response) => {
      try {
        let supplier = await this.service.findAll();
        response.send({ status: 1, data: supplier });
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
        let supplier = await this.service.saveOne(reqData);
        response.send({ status: 1, data: supplier });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    return this.router;
  }
}
