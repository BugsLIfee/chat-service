const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");

router.get("/:id", catchErrors(chatroomController.getChatroomByQuestionId));
router.get("/myAnswer/:id",  catchErrors(chatroomController.getMyAnswerChatrooms));
router.get("/myQestion/:id",  catchErrors(chatroomController.getMyQuestionChatrooms));
router.post("/create",catchErrors(chatroomController.createChatroom));

module.exports = router;
