const mongoose = require("mongoose")


const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User", //refrence to the user collection to get the user information
        required: true,
    },

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
        required: true,

    },
},
    {
        timestamps: true,

    })

//counpound index
 connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })  // 1 means ascending order -1 means descending order

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    // check fromUserId and touserId are same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request yourself")
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema)


module.exports = ConnectionRequest;