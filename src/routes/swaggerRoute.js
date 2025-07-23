import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "../swagger.json" with { type: "json" };

const swaggerRoute = Router();

swaggerRoute.use("/", swaggerUI.serve);
swaggerRoute.get("/", swaggerUI.setup(swaggerDocs));

export default swaggerRoute;
