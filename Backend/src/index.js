const express = require('express')
const connectDB = require("./config/database.js")
require('dotenv').config();
const cookieParser = require("cookie-parser")
const cors = require('cors')
const app = express();
const http = require('http');
//this is the middleware provided by the express to read the json formate of input
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173" || "3.111.47.221" || process.env.CORS,
    credentials: true,
}))
const PORT = 3000;


const authRouter = require("./Router/auth.js")
const profileRouter = require("./Router/profile.js")
const requestRouter = require("./Router/request.js");
const userRouter = require('./Router/user.js');
const instilizeSocket = require('./utils/socket.js');

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter);

const server = http.createServer(app)
instilizeSocket(server)
connectDB()


// request handler go to browser and type url localhost:3000/test
// app.use("/test", (req, res) => {
//     res.send("Hello from the server")
// })

// app.use("/user", (req, res, next)=>{ 
//     console.log("User 1 handled");
//     // res.send("Response from user 1");
//     next(); // this is given by expressjs

// },
// (req, res)=>{ // this will not work even if we comment the above response for that we have to use next() then if the 1st will not work then 2nd will work
//     console.log("user 2 handled");
//     res.send("User 2 response");

// })



server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

});