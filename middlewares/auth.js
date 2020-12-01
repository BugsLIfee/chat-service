const jwt = require("jwt-then");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    console.log("auth middleware:",token);
    console.log("process.env.SECRET:",process.env.SECRET);
    const payload = await jwt.verify(token, process.env.SECRET);
    console.log("payload",payload)
    req.payload = payload;
    next();
  } catch (err) {
    console.log("인증에러",err);
    res.status(401).json({
      message: "Forbidden 🚫🚫🚫",
    });
  }
};
