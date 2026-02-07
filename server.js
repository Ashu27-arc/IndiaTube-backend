const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const {
    Server
} = require("socket.io");
const connectDB = require("./config/db");

const app = express();
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    });
    socket.on("offer", (data) => {
        socket.to(data.roomId).emit("offer", data.offer);
    });

    socket.on("answer", (data) => {
        socket.to(data.roomId).emit("answer", data.answer);
    });

    socket.on("ice-candidate", (data) => {
        socket.to(data.roomId).emit("ice-candidate", data.candidate);
    });
});



app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/uploads", express.static("uploads"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));




app.get("/", (req, res) => {
    res.send("IndiaTube API Running");
});

server.listen(5000, () => console.log("Server running on port 5000"));