const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: Number,
    required: "Chatroom is required!",
    ref: "Chatroom",
  },
  user: {
    type: Number,
    required: "user is required!",
    ref: "User",
  },
  message: {
    type: String,
    required: "Message is required!",
  },
});

module.exports = mongoose.model("Message", messageSchema);
