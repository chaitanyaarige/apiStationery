import { createConnection } from "typeorm";
import AppExpress from "./entry/AppExpress";
// import sentryApp from "./sentry.js";
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

import "reflect-metadata";
require('dotenv').config();

let dbOptions: any = {
  name:  "default",
  type:  "postgres",
  host:  process.env.HEROKU ? process.env.HEROKU_HOST : "localhost",
  port:  5432,
  username: process.env.HEROKU ? process.env.HEROKU_USERNAME : "postgres",
  password: process.env.HEROKU ? process.env.HEROKU_PASSWORD : "postgres",
  database: process.env.HEROKU ? process.env.HEROKU_DATABASE : "pharmacy",
  url: process.env.DATABASE_URL ? process.env.DATABASE_URL : process.env.HEROKU_URL,
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

  // ********** Sentry Code - needs to move it out - hide DSN in envs ***** // 
    if(process.env.HEROKU) {
      Sentry.init({
        dsn: process.env.sentryDSN,
        integrations: [
          // enable HTTP calls tracing
          new Sentry.Integrations.Http({ tracing: true }),
          // enable Express.js middleware tracing
          new Tracing.Integrations.Express({ expressObj }),
        ],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      });
      // RequestHandler creates a separate execution context using domains, so that every
      // transaction/span/breadcrumb is attached to its own Hub instance
      expressObj.use(Sentry.Handlers.requestHandler());
      // TracingHandler creates a trace for every incoming request
      expressObj.use(Sentry.Handlers.tracingHandler());
      // The error handler must be before any other error middleware and after all controllers
      expressObj.use(Sentry.Handlers.errorHandler());
      // Optional fallthrough error handler
      expressObj.use(function onError(err, req, res, next) {
        // The error id is attached to `res.sentry` to be returned
        // and optionally displayed to the user for support.
        res.statusCode = 500;
        res.end(res.sentry + "\n");
      });
      expressObj.get("/debug-sentry", function mainHandler(req, res) {
        throw new Error("My first Sentry error!");
      });
      expressObj.use(
        Sentry.Handlers.errorHandler({
          shouldHandleError(error) {
            // Capture all 404 and 500 errors
            if (error.status === 404 || error.status === 500) {
              return true;
            }
            return false;
          },
        })
      );
    }
    // End of Sentry code 
    }
  } catch (error) {
    console.log(error);
  }
};
start();
