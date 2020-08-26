import { Router, Request, Response } from "express";
import { CompanyService } from "../services/CompanyService"

export class CompanyControllers {
  private componentName: string = "CompanyControllers";
  private router: Router = Router();
  private service: any = new CompanyService();

  getRouter(): Router {
    this.router.get("/", async (request: Request, response: Response) => {
      try {
        let company = await this.service.findAll();
        response.send({ status: 1, data: company });
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
        let company = await this.service.saveOne(reqData);
        response.send({ status: 1, data: company });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    return this.router;
  }
}
