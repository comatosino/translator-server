import "dotenv/config";
import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../client/src/types/User";
import { readDB, writeDB } from "../mockDB";

export const login: RequestHandler = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const db = await readDB();
    const user = db.find((user) => user.username === req.body.username);

    if (!user) {
      res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!(await bcrypt.compare(user.password, req.body.password))) {
      res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      const token = jwt.sign(user, process.env.JWT_SECRET!, {
        expiresIn: 86400,
      });
      res.status(200).json({ user, token });
    }
  } catch (error) {
    console.log(error);
  }
};

export const register: RequestHandler = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ error: "Password too short" });
  }

  try {
    const db = await readDB();
    const user = db.find((user) => user.username === req.body.username);

    if (user) {
      return res.status(401).json({ error: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser: User = {
        id: uuidv4(),
        username: req.body.username,
        password: hashedPassword,
      };
      db.push(newUser);
      await writeDB(db);

      const token = jwt.sign(newUser, process.env.JWT_SECRET!, {
        expiresIn: 86400,
      });

      res.status(201).json({ user, token });
    }
  } catch (error) {
    console.log(error);
  }
};
