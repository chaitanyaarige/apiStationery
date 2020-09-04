import { Router, Request, Response } from "express";
import { SchoolService } from "../services/SchoolService"

export class SchoolControllers {
  private componentName: string = "SchoolControllers";
  private router: Router = Router();
  private service: any = new SchoolService();

  getRouter(): Router {
    this.router.get("/", async (request: Request, response: Response) => {
      try {
        let schools = await this.service.findAll();
        response.status(200).send({ schools });
      } catch (error) {
        console.log(error);
        response.status(400).send({ error });
      }
    });

    this.router.get("/:id", async (request: Request, response: Response) => {
      try {
        let schools = await this.service.findOne();
        response.status(200).send({ schools });
      } catch (error) {
        console.log(error);
        response.status(400).send({ error });
      }
    });

    this.router.patch("/:id", async (request: Request, response: Response) => {
      try {
        let reqData: any;
        reqData = request.body ? request.body : {};
        this.service.sessionInfo = request.body.sessionInfo;
        let school = await this.service.editOne(reqData);
        response.status(201).send({ school });
      } catch (error) {
        console.log(error);
        response.status(400).send({ error });
      }
    });

    this.router.post("/", async (request: Request, response: Response) => {
      try {
        let reqData: any;
        reqData = request.body ? request.body : {};
        this.service.sessionInfo = request.body.sessionInfo;
        let school = await this.service.saveOne(reqData);
        response.status(200).send({ school });
      } catch (error) {
        console.log(error);
        response.status(400).send({ error });
      }
    });

    this.router.delete("/:id", async (request: Request, response: Response) => {
      try {
        let reqData: any;
        reqData = request.params ? request.params.id : {};
        // this.service.sessionInfo = request.body.sessionInfo;
        let school = await this.service.deleteOne(reqData);
        response.status(204).send({ school });
      } catch (error) {
        console.log(error);
        response.status(400).send({ error });
      }
    });

    return this.router;
  }
}
