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

export const login = async (req, res) => {
  //db operations
  const { username, password } = req.body;

  try {
    //check if user exists
    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials!" });
    //check user password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).jason({ message: "Invalid credentials!" });
    //generate cookie token and send to user
    res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  //db operations
};
