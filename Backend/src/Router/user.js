const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectioRequest");
const User = require("../models/userSchema");

const userRouter = express.Router();


const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
// receive connection
userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",

        }).populate("fromUserId", ["firstName", "lastName", "emailId"]);
        // we can pass this part ["firstName", "lastName"] in string like "firstName lastName" both the work in same way

        res.json({
            message: "Data Fetched successfully",
            data: connectionRequest,
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

//connection request
userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        }).populate("fromUserId", "firstName lastName")
            .populate("toUserId", "firstName lastName").lean();

        const data = connectionRequest.map((row) => {

            // if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
            //     return row.toUserId;
            // }
            return row.fromUserId
        }); //this will only gives the fromUserId data if i dont need toUserId data and status and all 

        // const data = connectionRequest.map((row) => {
        //     if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        //         return row.toUserId;
        //     } else {
        //         return row.fromUserId;
        //     }
        // });
        res.json({
            message: "Connection fetch successfully",
            data: data,
        })

    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

//feed api

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        // Step 1: Get all connection requests involving the user
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ],
        }).select("fromUserId toUserId");

        // Step 2: Build a set of user IDs to hide (already connected/requested users)
        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((req) => {
            if (req.fromUserId) hideUsersFromFeed.add(req.fromUserId.toString());
            if (req.toUserId) hideUsersFromFeed.add(req.toUserId.toString());
        });

        // Step 3: Also hide the current user from their own feed
        hideUsersFromFeed.add(loggedInUser._id.toString());

        // Step 4: Fetch users NOT in the hidden list
        const users = await User.find({
            _id: { $nin: Array.from(hideUsersFromFeed) },
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        res.status(200).json({
            message: "Feed fetched successfully",
            page,
            limit,
            count: users.length,
            data: users,
        });

    } catch (err) {
        console.error("Feed Error:", err.message);
        res.status(400).json({ message: "Something went wrong: " + err.message });
    }
});



module.exports = userRouter;  