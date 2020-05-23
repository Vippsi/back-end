const router = require("express").Router();
const db = require("./storyDb");
const bcrypt = require("bcryptjs");
const middleware = require("../auth/middleware")

//stories
router.get("/", (req, res) => {
  db.get()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.post("/", (req, res) => {


});

router.put("/:id", (req, res) => {


});

router.delete("/:id", (req, res) => {


});




module.exports = router;





router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  db.remove(Number(req.params.id))
    .then((result) => {
      if (result === 1) {
        res.status(204).send();
      } else {
        res.status(500).json({ error: "error deleting post" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const post = db
    .update(Number(req.params.id), req.body)
    .then((result) => {
      if (result === 1) {
        res.status(204).send();
      } else {
        res.status(500).json({ error: "error updating record" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  db.getById(req.params.id)
    .then((result) => {
      if (result) {
        req.post = result;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
}

module.exports = router;
