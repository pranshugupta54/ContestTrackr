const express = require('express');
const router = express.Router();
const leetCodeService = require('../services/leetcode');
const codeforcesService = require('../services/codeforces');
const date = require("../date.js");

router.get("/", async function (req, res) {
    try {
      const day = date.getDate()
      const cflist = await codeforcesService.codeforces_c();
      const llist = await leetCodeService.leetcode_c();
      console.log("FILTERED:");
    //   console.log(cflist);
    //   console.log(llist);
    //   console.log(llist.length);
      const finalList = [...cflist, ...llist];
      finalList.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
      console.log(finalList);
      res.render("codeforces.ejs", {date: day, list:finalList});
      // res.send(list);
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send("Internal Server Error");
    }
});

module.exports = router;