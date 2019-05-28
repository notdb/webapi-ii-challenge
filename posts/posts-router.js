const Posts = require("../data/db.js");

const router = require("express").Router();

//get requests

router.get("/", async (req, res) => {
  try {
    const post = await Posts.find(req.query);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error retrieving the hubs"
    });
  }
});

module.exports = router;
