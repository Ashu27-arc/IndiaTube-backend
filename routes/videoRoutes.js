const router = require("express").Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const {
    uploadVideo,
    getVideos,
    likeVideo,
    searchVideos,
    recommendVideos
} = require("../controller/videoController");

router.post("/upload", auth, upload.single("video"), uploadVideo);
router.get("/", getVideos);
router.put("/like/:id", auth, likeVideo);
router.get("/search", searchVideos);
router.get("/recommend", recommendVideos);





module.exports = router;