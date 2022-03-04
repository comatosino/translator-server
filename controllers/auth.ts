import { RequestHandler } from "express";
// import jwt from "jsonwebtoken";

export const signup: RequestHandler = async (req, res) => {
  console.log("PING /auth/signup");
  try {
    // expect username, password, email in req. body
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
  res.send({ message: "signup!!" });
};

export const signin: RequestHandler = async (req, res) => {
  console.log("PING /auth/signin");
  try {
    // expect username and password in req.body
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
  res.send({ message: "signin!!" });
};

// TODO: send a 204 here
// remove JWT client-side
export const signout: RequestHandler = async (req, res) => {
  console.log("PING /auth/signout");
  try {
  } catch (error) {
    console.log(error);
  }
  res.send({ message: "signout!!" });
};
