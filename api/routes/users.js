const router = require("express").Router();
const User = require("../models/Users");
const auth = require("./verifytoken");


router.post("/register", async (req, res) => {
  console.log("något")
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

router.post("addtag/:uuid" , auth.auth, async (req,res) => {
  if(rew.user.role = "user"){
    let uuid = req.params.uuid
    const tag = {
      tag: req.body.input,
      id:uuid
    }
    const newtag = await User.insert(tag);
    res.status(201).json(newtag)
    console.log(newtag)
  }else
    res.status(404).send("User not found")
})

router.get("/tags/:uuid", auth.auth, async (req, res) => {
  if(req.user.role){

    const id = req.params.uuid;
    const gettags = await Orderdata.find({ id: id });
    ///hämta dokumentet med nyckel uuid i databasen
    console.log(gettags);
  
    //Skicka tillbaka till frontend
    res.status(201).json(gettags);
  }else{
    res.status(404).send("tag not found")
  }
});
module.exports = router;

