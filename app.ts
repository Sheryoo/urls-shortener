import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./models/database";

import urlsRouters from "./routes/urls";
const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use(urlsRouters);

app.listen(8080, () => {
  console.log("Server is running on port 8080 \n\n http://localhost:8080");
});
