const { Router } = require("express");
const router = new Router();
const fs = require("fs");


router.get("/", async (req, res) => {
  const stream = fs.createReadStream("./data/butiker.json");
  stream.pipe(res);
});

module.exports = router;