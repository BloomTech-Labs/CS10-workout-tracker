const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  register,
  login,
  addProgress,
  fetchProgress
} = require("./controllers/UserControllers");

// TODO: Remove below code once Leon's verification branch gets merged
const secret = process.env.SECRET;

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log("token", token)
  if (!token)
    return res.status(403).send({ authed: false, message: "No token provided." });
  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res.status(500).send({ authed: false, message: "The token could not be verified "});
    req.username = decoded;
    req.user_id = decoded.id;
    console.log(decoded)
    next();
  })
}
// ------------------------------------------------------------------------------

module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/progress").post(addProgress);
  app.route("/progress").get(verifyToken, fetchProgress);
};
