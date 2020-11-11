const { Router } = require("express");
const router = new Router();
const Butik = require("../models/Butiker");
const auth = require("./verifytoken");

const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET);

router.get("/stores", async  (req,res) => {
const data = await Butik.createdlogs()
if(data){
  res.status(200).json(data);
  return; 
}
res.status(500).json({ error: "Someting wrong" });
})

router.post("/newstore", auth.auth, async (req, res) => {
  if(req.user.role = "user"){
    const data = await Butik.create(req.body);
    if (data) {
      res.status(200).json(data);
      return;
    }
    res.status(500).json({ error: "Dont find Stream" });
  }
});

module.exports = router;