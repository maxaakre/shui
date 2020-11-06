const { Router } = require("express");
const router = new Router();
const fs = require("fs");
const Butik = require("../models/Butiker");

const Cryptr = require('cryptr');
const { assert } = require("console");
const cryptr = new Cryptr('myTotalySecretKey');

const encryptedString = cryptr.encrypt('bacon');
const decryptedString = cryptr.decrypt(encryptedString);


// router.get("/", async (req, res) => {
//   const stream = fs.createReadStream("./data/butiker.json");
//   stream.pipe(res);
// });

router.get("/stores",async  (req,res) => {

const data = await Butik.createdlogs(req.body)
if(data){
  res.status(200).json(data);
  return; 
}
res.status(500).json({ error: "Someting wrong" });
})


router.post("/newstore", async (req, res) => {
  const data = await Butik.create(req.body);
  if (data) {
    res.status(200).json(data);
    return;
  }
  res.status(500).json({ error: "Dont find Stream" });
});

module.exports = router;