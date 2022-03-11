import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";

import { v4 as uuidv4 } from "uuid";
import User from "../mockDB/models/User";
import { readDB, writeDB } from "../mockDB";

const SECRET_KEY = process.env.SECRET_KEY!;

export const getUser: RequestHandler = async (req, res) => {
  try {
    if (!req.userID) return res.status(401).json({ error: "NOT AUTHORIZED" });

    const db = await readDB();
    const user = db.find((user) => user.id === req.userID);

    if (!user) throw new Error("USER NOT FOUND");

    res.status(200).json({ profile: { username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ERROR FETCHING USER PROFILE" });
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
    const existingUser = db.find((user) => user.username === req.body.username);

    if (existingUser) {
      return res.status(401).json({ error: "User already exists" });
    }

    const newUser: User = {
      id: uuidv4(),
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    };
    db.push(newUser);
    await writeDB(db);

    const token = jwt.sign({ userID: newUser.id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(201).json({ profile: { username: newUser.username }, token });
  } catch (error) {
    console.error(error);
  }
};

export const login: RequestHandler = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const db = await readDB();
    const user = db.find((user) => user.username === req.body.username);

    if (!user) {
      res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      const token = jwt.sign({ userID: user.id }, SECRET_KEY, {
        expiresIn: "24h",
      });

      res.status(200).json({ profile: { username: user.username }, token });
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout: RequestHandler = async (req, res) => {
  req.userID ? res.sendStatus(204) : res.sendStatus(403);
};
