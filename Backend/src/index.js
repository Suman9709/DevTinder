const express = require('express')
const connectDB = require("./config/database.js")
require('dotenv').config();
const User = require("./models/userSchema.js")


const app = express();
const PORT = 3000;

connectDB()



app.post("/signup", async (req, res) => {
    //created new instance of the user model
    const user = new User({
        firstName: "Suman",
        lastName: "Kumar",
        emailId: "abc@gmail.com",
        password: "12345678",
    });
    try {
        await user.save();
        res.send("User added successfully");
    } catch (error) {
        res.status(400).send("Error in saving user" + error.message)
    }
})

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



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

});