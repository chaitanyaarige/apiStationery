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
        response.status(200).send({ stationery });
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
        let stationery = await this.service.saveOne(reqData);
        response.status(200).send({ stationery });
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
        let stationery = await this.service.editOne(reqData);
        response.status(201).send({ stationery });
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
        let stationery = await this.service.deleteOne(reqData);
        response.status(204).send({ stationery });
      } catch (error) {
        console.log(error);
        response.status(400).send({ error });
      }
    });
    return this.router;
  }
}
