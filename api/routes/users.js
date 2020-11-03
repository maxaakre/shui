const { Router } = require("express");
const router = new Router();
const User = require("../models/Users");
const auth = require("./verifytoken");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");


//REGISTER NEW USER
router.post("/register", async (req, res) => {
  const user = await User.register(req.body);
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(404).send("You are not a menmber try again");
  }
});
//AUTHORIZED USERS WITH TOKEN
router.post("/auth", async (req, res) => {
  const token = await User.login(req.body);
  if (token) {
    res.status(201).json(token);
    console.log('Your are in!')
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
});

//DELETE USER
router.post("/delete", auth.auth, async (req,res) =>{
  if(req.user.role === "user"){
    const user = User.delete(req.user.userID)
    res.status(201).json(user)
  }else{
    res.status(404).send("User not found")
  }
})
module.exports = router;
