import "dotenv/config";
import db from "./db";
import cors from "cors";
import express from "express";
import routes from "./routes";
import { authenticate } from "./middleware";

const PORT = process.env.PORT || 5000;
const app = express();

db.connect();

app.use(cors({ origin: "https://traductora.herokuapp.com" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticate);
app.use(routes);

app.get("*", (_req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
