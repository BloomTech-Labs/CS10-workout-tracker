const jwt = require("jsonwebtoken"); // Remove once verification branch gets merged
require("dotenv").config(); // Remove once verification branch gets merged

const {
  register,
  login,
} = require("./controllers/UserControllers");

const {
  addProgress,
  fetchProgress
} = require("./controllers/ProgressControllers");

// TODO: Remove below code once Leon's verification branch gets merged
const secret = process.env.SECRET;

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log("token", token);
  if (!token)
    return res
      .status(403)
      .send({ authed: false, message: "No token provided." });
  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ authed: false, message: "The token could not be verified " });
    req.username = decoded;
    req.user_id = decoded.id;
    console.log(decoded);
    next();
  });
}
// ------------------------------------------------------------------------------

module.exports = app => {
  app.route("/register").post(register);
  app.route("/login").post(login);
  app.route("/progress").post(verifyToken, addProgress);
  app.route("/progress").get(verifyToken, fetchProgress);
};
