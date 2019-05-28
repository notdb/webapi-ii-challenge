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

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post.length === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the post"
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Posts.findCommentById(req.params.id);
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error: The comments information could not be retrieved"
    });
  }
});

// posts

router.post("/", async (req, res) => {
  try {
    const post = await Posts.insert(req.body);

    if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      return res.status(201).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.body.text);
    const post = await Posts.insertComment(req.body.text);
    if (!req.params.id) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (!req.body.text) {
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." });
    } else {
      res.status(201).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});

// delete

router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.remove(req.params.id);
    if (post.length === 0) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    } else {
      res.status(201).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

// put

router.put("/:id", async (req, res) => {
  try {
    console.log(req.body, req.params.id);
    const post = await Posts.update(req.params.id, req.body);
    if (post.length === 0) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    } else if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "The post information could not be modified."
    });
  }
});

module.exports = router;
