const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");
const app = express();
app.use(express.json());
const User = require("./models/User");
connectDB();
//add
app.post("/users/add", async (req, res) => {
  const { name, email, phone } = req.body;
  const newUser = new User({ name, email, phone });
  try {
    let user = await newUser.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});
//Get All
app.get("/users/get", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});
//get user by id
app.get("/users/get/:userID", async (req, res) => {
  try {
    let user = await User.findById(req.params.userID);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});
//delete
app.delete("/users/delete/:userID", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userID);
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
});
//Edit
app.put("/users/edit/:userID", async (req, res) => {
  try {
    let editedUser = await User.findByIdAndUpdate(
      req.params.userID,
      { ...req.body },
      { new: true }
    );
    res.send(editedUser);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) =>
  error ? console.error(err) : console.log(`server is running en port ${PORT}`)
);
