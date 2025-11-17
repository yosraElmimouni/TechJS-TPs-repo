const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require("./mongodbConnexion");
const ExpressError = require("express-error");

// The authenticated users can access the books section of the app

async function registerUser(username, password, email) {
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new Users({
    username: username,
    password: hashedPassword,
    email: email,
  });
  await newUser.save();
  console.log("User registered successfully");
}
async function authenticateUser(username, password) {
  const user = await Users.findOne({ username: username });
  if (!user) {
    throw new ExpressError("User not found", 404);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ExpressError("Invalid password", 401);
  }
  if (isPasswordValid && user) {
    console.log("Authentication successful");
    return user;
  }
  return null;
  
}