import express from "express";
import connectDb from "./src/database/db.js";
import dotenv from "dotenv";
import userRoute from "./src/routes/userRoute.js";
import authRoute from "./src/routes/authRoute.js";
import newsRoute from "./src/routes/newsRoute.js";
import swaggerRoute from "./src/routes/swaggerRoute.js";

dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
