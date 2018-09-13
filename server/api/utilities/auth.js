const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

function generateToken(username) {
  const options = {
    expiresIn: "1440m"
  };
  console.log(`About to make a token for ${username}`);
  const payload = { name: username };
  const token = jwt.sign(payload, secret, options);
  console.log("Made the token: ", token)
  return token;
}

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ authed: false, message: "No token provided." });
  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res.status(500).send({ authed: false, message: "The token could not be verified "});
    req.username = decoded;
    next();
  })
}

module.exports = {
  generateToken,
  verifyToken
}