const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

exports.addUser = async (req, res) => {

  console.log("createRoom controller 도착, req:", req.body);
  const { questionId, questionUserId, answerUserId} = req.body;
  const chatroomExists = await Chatroom.findOne({ questionId : questionId });

  if (!chatroomExists){
    const chatroom = new Chatroom({
  ...req.body
    });
    await chatroom.save();
    res.json({
      message: "Premium Chatroom created!",
    });
  }else{
    console.log("이미 만들어진 채팅방이 존재합니다.")
  }

};

exports.getChatroomByQuestionId = async (req, res) => {
  const chatroom = await Chatroom.find({ questionId: req.questionId })
  res.json(chatroom);
};

exports.getMyAnswerChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({ answerUserId: req.userid })
  res.json(chatrooms);
};
exports.getMyQuestionChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({ questionUserId: req.userid })
  res.json(chatrooms);
};
