const socket = require('socket.io')
require('dotenv').config();
const instilizeSocket = (server) => {

    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173" || process.env.CORS,
        }
    })

    io.on("connection", (socket) => {
        //handle events
        socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
            const roomId = [userId, targetUserId].sort().join("_");
            console.log(firstName + " joining room: " + roomId);

            socket.join(roomId);
        });

        socket.on("sendMessage", ({
            firstName,
            userId,
            targetUserId,
            text,
        }) => {
            const roomId = [userId, targetUserId].sort().join("_");
            io.to(roomId).emit("messageReceived", { firstName, text })
        });
        socket.on("disconnect", () => {

        })
    });
}

module.exports = instilizeSocket