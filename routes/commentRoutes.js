const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
    addComment,
    getComments
} = require("../controller/commentController");

router.post("/", auth, addComment);
router.get("/:id", getComments);

module.exports = router;