import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  return Sentry.init({
    dsn: "https://43047a7392374d4196096e1c6847f739@o1097603.ingest.sentry.io/6119196",
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0,
  });
}

function log(error) {
  return Sentry.captureException(error);
}

const logger = {
  init,
  log,
};

export default logger;
