import { Router, Request, Response } from "express";
import { SchoolService } from "../services/SchoolService"

export class SchoolControllers {
  private componentName: string = "SchoolControllers";
  private router: Router = Router();
  private service: any = new SchoolService();

  getRouter(): Router {
    this.router.get("/", async (request: Request, response: Response) => {
      try {
        let school = await this.service.findAll();
        response.send({ status: 1, data: school });
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
        let school = await this.service.saveOne(reqData);
        response.send({ status: 1, data: school });
      } catch (error) {
        console.log(error);
        response.send({ status: 0, error: error });
      }
    });

    return this.router;
  }
}
