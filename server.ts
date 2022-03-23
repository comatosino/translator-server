import "dotenv/config";
import db from "./db";
import express from "express";
import path from "path";
import routes from "./routes";
import { authenticate } from "./middleware";

const PORT = process.env.PORT || 5000;
const app = express();

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/client/build"));

app.use(authenticate);
app.use(routes);

app.get("/", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
