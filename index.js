const express = require("express");
const app = express();
const router = express.Router();
const { user } = require("./models");

app.get("/", async (req, res, next) => {
  try {
    const users = await user.findAll();
    res
      .status(200)
      .json({ success: true, message: "users fetched successfuklly", users });
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(4000, () => {
  console.log("server running on 4000");
});
