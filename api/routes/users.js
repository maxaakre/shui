const router = require("express").Router();
const User = require("../models/Users");
const auth = require("./verifytoken");
const butik = require("../models/Butiker")


router.post("/register", async (req, res) => {
  const user = await User.register(req.body);
  if (user) {
    res.status(201).json(user);
    return;
  }
  res.status(500).json({ error: "Credentials not valid" });
});
router.post("/auth", async (req, res) => {
  const user = await User.login(req.body);
  if (user) {
    res.status(200).json(user);
    return;
  }
  res.status(500).json({ error: "Credentials not valid" });
});

router.post("/delete", auth.auth, async (req,res) =>{
  if(req.user.role = "user"){
    const user = User.delete(req.user.userID)
    res.status(201).json(user)
  }else{
    res.status(404).send("User not found")
  }
})

router.post("/addtag" , auth.auth,  async (req,res) => {
  if(req.user.userID){
    console.log(req.user.userID)
    console.log(req.body)
    const newtag = await User.insertTag(req.body, req.user.userID);
    res.status(201).json(newtag)
    console.log(newtag)
  }else
    res.status(404).send("User not found")
})

router.get("/tags", auth.auth, async (req, res) => {
  if(req.user.role = "user"){
    const streams = await butik.createdlogs(req.user.userID)
    if(streams){
      res.json(streams)
      return
    }
    res.status(404).send("cant find resourses")
  }
});

router.get("/usertags",auth.auth, async (req,res) =>{
  if(req.user.role = "user"){
    const userArray = await User.findTag(req.user.userID)
    if(userArray){
      res.json(userArray)
      return
    }
    res.status(404).send("cant find resourses")
  }
})

router.post("/deletedtag", auth.auth, async (req,res) =>{
  console.log("req.body",req.body)
  if(req.body){
    const deleteArray = await User.removeTag(req.user.userID,req.body.tag)
    console.log("deletade", deleteArray)
    if(deleteArray){
      res.json(deleteArray)
      return
    }
    res.status(404).send("cant find resourses")
  }
})


module.exports = router;

