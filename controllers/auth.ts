import { RequestHandler } from "express";

export const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
  } catch (error) {
    console.log(error);
  }
  res.send({ message: "login!!", ...req.body });
};

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
  } catch (error) {
    console.log(error);
  }
  res.send({ message: "register!!", ...req.body });
};
