const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
    register,
    login,
    subscribe
} = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/subscribe/:id", auth, subscribe);

module.exports = router;