import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import { SchoolControllers } from "../controllers/SchoolControllers";
import { CompanyControllers } from "../controllers/CompanyControllers";
import { StationeryControllers } from "../controllers/StationeryControllers";
import { OrderControllers } from "../controllers/OrderControllers";

export default class AppExpress {
  public express: any;

  constructor() {
    this.express = express();
    this.express.use(json());
    this.mountRoutes();
    this.chunkDataHandle();
  }

  public async mountRoutes() {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Website Application Main Route"
      });
    });
    this.express.use("/", router);
    this.express.use(cors())
    this.express.use("/api/schools", await new SchoolControllers().getRouter())
    this.express.use("/api/companies", await new CompanyControllers().getRouter())
    this.express.use("/api/stationery", await new StationeryControllers().getRouter())
    this.express.use("/api/orders", await new OrderControllers().getRouter())
  }


  private chunkDataHandle(): void {
    this.express.all("*", (req: any, res: express.Response, next: any) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "accept, Content-Type, Authorization");
        res.setHeader('Access-Control-Allow-Credentials', "true");
        if (req.headers["content-type"] && req.headers["content-type"].indexOf("application/x-www-form-urlencoded") > -1) {
            this.parsePost(req, (data: any) => {
                if (data && data != "") {
                    req.body = data;
                }
                next();
                console.log("=================parse nest=======================================")
            });

            console.log("================== next 1 ===================")
            // next();
        } else {
            console.log("================== next 2 ===================")
            next();
        }
    });
}

private parsePost(req: express.Request, callback: any) {
    var data = "";
    req.on("data", chunk => {
        data += chunk;
    });
    req.on("end", () => {
        if (data != "") {
            data = JSON.parse(data);
        }
        callback(data);
    });
}
}
