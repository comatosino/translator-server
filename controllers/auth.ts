import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../db/models";
import { RequestHandler } from "express";

export const getUser: RequestHandler = async (req, res) => {
  try {
    if (!req.userID) return res.status(401).json({ error: "Please login" });

    const user = await User.findById(req.userID).populate("translations");
    if (!user) throw new Error();

    res.status(200).json({
      profile: {
        username: user.username,
        translations: user.translations,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    if (req.body.password.length < 8) {
      return res.status(400).json({ error: "Password too short" });
    }

    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(401).json({ error: "User already exists" });
    }
    user = await User.create(req.body);

    const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY!, {
      expiresIn: "24h",
    });

    res.status(201).json({
      token,
      profile: {
        username: user.username,
        translations: user.translations || [],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(401).json({ error: "Wrong username and/or password" });
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({ error: "Wrong username and/or password" });
    } else {
      const token = jwt.sign({ userID: user.id }, process.env.SECRET_KEY!, {
        expiresIn: "24h",
      });
      res.status(200).json({
        token,
        profile: {
          username: user.username,
          translations: user.translations,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout: RequestHandler = async (req, res) => {
  req.userID ? res.sendStatus(204) : res.sendStatus(403);
};
