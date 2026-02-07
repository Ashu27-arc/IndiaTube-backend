const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
    addHistory,
    addWatchLater,
    getUser
} = require("../controller/userController");

router.post("/history", auth, addHistory);
router.post("/watchlater", auth, addWatchLater);
router.get("/:id", getUser);

module.exports = router;