const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

// ********** Sentry Code - needs to move it out - hide DSN in envs ***** //
// process.env.isProduction ? then execute the following sentry code //
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
// End of Sentry code
