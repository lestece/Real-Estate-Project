import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  //db operations
  const { username, email, password } = req.body;
  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    //crate a new user and save to database
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = (req, res) => {
  //db operations
};

export const logout = (req, res) => {
  //db operations
};
