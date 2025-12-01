import express from "express";
import dotenv from "dotenv";
import oauthRoutes from "./oauth.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use("/", oauthRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
