import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDb from "./src/database/db.js";
import router from "./src/routes/index.js";

const app = express();

connectDb();
app.use(express.json());
app.use(cors());
app.use(router);

export default app;
