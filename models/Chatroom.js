const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({

  chatroomId: {
    // type: mongoose.Schema.Types.ObjectId,
   type: Number,
       required: "chatroomId is required!",
  },
  questionUserId: {
    type: Number,
    required: "questionUserId is required!",
  },
  answerUserId: {
    type: Number,
    required: "AnswerUserId is required!",
  },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);
