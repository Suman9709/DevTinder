const jwt = require("jsonwebtoken");
const User = require("../models/userSchema.js");

const userAuth = async (req, res, next) => {
    try {
        //Read the token from the req.cookies
        const { token } = req.cookies

        if (!token) {
            throw new Error("TOken is not Valid")
        }

        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET_KEY)


        const { _id } = decodedObj;

        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User not found")
        }
        req.user = user  //loggedin user
        next();

    } catch (error) {
        res.status(404).send("Error " + error.message)
    }
    //find the user
}

module.exports = {
    userAuth,
}