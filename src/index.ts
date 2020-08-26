import { createConnection } from "typeorm";
import AppExpress from "./entry/AppExpress"
import "reflect-metadata";
require('dotenv').config();

let dbOptions: any = {
  name:  "default",
  type:  "postgres",
  host:  process.env.HEROKU_HOST || "localhost",
  port:  5432,
  username:  process.env.HEROKU_USERNAME || "postgres",
  password:  process.env.HEROKU_PASSWORD || "postgres",
  database:  process.env.HEROKU_DATABASE || "pharmacy",
  url: process.env.HEROKU_URL || '',
  synchronize: true,
  logging: false,
  entities: process.env.HEROKU ? ["dist/entity/*{.ts,.js}"] : ["src/entity/*{.ts,.js}"],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    }
  }
}

let start = async () => {
  try {
    let connection = await createConnection(dbOptions);
    if (connection.isConnected) {
      console.log("Connected To DataBase");
      let expressObj = new AppExpress().express;

      let port =  process.env.PORT || 5200;
      expressObj.listen(port, () => {
        console.log(` ***********************************************
           server is listening on ${port}  http://localhost:${port}/
          ***********************************************`);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
start();
