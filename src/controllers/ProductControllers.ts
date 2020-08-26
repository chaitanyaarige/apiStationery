import { Router, Request, Response } from "express";
import { ProductsService } from "../services/ProductService"

export class ProductControllers {
  private componentName: string = "ProductControllers";
  private router: Router = Router();
  private service: any = new ProductsService();

  getRouter(): Router {
    this.router.get("/", async (request: Request, response: Response) => {
      try {
        let products = await this.service.findAll();
        response.send({ status: 1, data: products });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    this.router.get("/:id", async (request: Request, response: Response) => {
      try {
        let reqData: any;
        reqData = request.body ? request.body : {};
        let products = await this.service.findOne(reqData.id );
        response.send({ status: 1, data: products });
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
        let products = await this.service.saveOne(reqData);
        response.send({ status: 1, data: products });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    return this.router;
  }
}
