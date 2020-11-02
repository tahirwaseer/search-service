import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";

import routes from "./routes";

// Create Express server
const app = express();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * App routes.
 */
app.use("/", routes);


export default app;
