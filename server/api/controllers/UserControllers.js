const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const secret = process.env.SECRET;
const sgAPIKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.MAILER_EMAIL_ID;
sgMail.setApiKey(sgAPIKey);

function generateToken(user) {
  const options = {
    expiresIn: "30m"
  };
  const payload = { name: user.username };

  return jwt.sign(payload, secret, options);
}

const register = (req, res) => {
  const { username, password, email } = req.body;

  const newUser = new User({
    username,
    password,
    email
  });
  newUser
    .save()
    .then(createdUser => {
      const token = generateToken(createdUser);
      res.json({ createdUser, token });
    })
    .catch(err => {
      res.status(422);
      res.json({ "Error creating user": err.message });
    });
};

const login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username.toLowerCase() })
    .then(user => {
      user
        .checkPassword(password)
        .then(success => {
          res.status(200);
          const token = generateToken(user);
          res.json({ username, token });
        })
        .catch(err => {
          res.status(422);
          res.json({ "Password incorrect": err.message });
        });
    })
    .catch(err => {
      res.status(404);
      res.json({ "Username not found": err.message });
    });
};

// const changePassword = (req, res) => {
//   const { username, password, newPassword } = req.body;
//   User.findOne({ username: username.toLowerCase() }).then(user => {
//     console.log(user);
//     user
//       .checkPassword(password)
//       .then(success => {
//         user.password = newPassword;
//         console.log(user.password);
//         user.save(updatedPW => {
//           res.status(200);
//           res.json({ "New password": user.password });
//         });
//       })
//       .catch(err => {
//         res.status(422);
//         res.json({ "Password incorrect": err.message });
//       });
//   });
// };

const forgotPassword = (req, res) => {
  const { username, email } = req.body;
  if (!email && !username) {
    return res.status(400).json({ message: "No email or username provided" });
  }

  User.findOne({ email: email }).then(user => {
    const token = generateToken(user);
    const url = "http://localhost:8080/reset_password?token=" + token;
    let emailData = {
      to: user.email,
      from: senderEmail,
      subject: "Password help has arrived!",
      text:
        "username, You requested for a password reset, kindly use this link. Cheers!",
      html: `<h3>${
        user.username
      }, </h3> <p> You requested for a password reset, kindly use this <a href="${url}">link</a> to reset your password</p> <br> <p>Cheers!</p>`
    };
    sgMail.send(emailData, function(err) {
      if (!err) {
        return res.json({
          message: "Kindly check your email for further instructions"
        });
      } else {
        return res.json(err);
      }
    });
  });
};

const resetPassword = function(req, res, next) {
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function(err, user) {
    if (!err && user) {
      if (req.body.newPassword === req.body.verifyPassword) {
        user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        user.save(function(err) {
          if (err) {
            return res.status(422).send({
              message: err
            });
          } else {
            let data = {
              to: user.email,
              from: senderEmail,
              subject: "Password Reset Confirmation",
              text:
                "username, Your password has been successfully reset, you can now log in with your new password. Cheers!",
              html:
                "<h3>{{username}}, </h3> <p> Your password has been successfully reset, you can now log in with your new password.</p> <br> <p>Cheers!</p>"
            };

            sgMail.send(data, function(err) {
              if (!err) {
                return res.json({ message: "Password reset" });
              } else {
                return done(err);
              }
            });
          }
        });
      } else {
        return res.status(422).send({
          message: "Passwords do not match"
        });
      }
    } else {
      return res.status(400).send({
        message: "Password reset token is invalid or has expired."
      });
    }
  });
};

const sendGridTest = (req, res) => {
  sgMail.setApiKey(sgAPIKey);
  const msg = {
    to: "amanda@phillipsdev.org",
    from: "astacy.phillips@gmail.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sgMail.send(msg);
  res.json({ message: "success" });
};

const addProgress = (req, res) => {
  const { weight, hips, waist, r_arm, l_arm, r_leg, l_leg, user } = req.body;
  // const { user } = req.params;
  User.findOne({ username: user.toLowerCase() })
    .then(user => {
      const newProgress = { weight, hips, waist, r_arm, l_arm, r_leg, l_leg };

      user.progress.push(newProgress);
      user.save().then(user => {
        res.json(user);
      });
    })
    .catch(err => {
      res.status(422);
      res.json({ "Error submitting progress": err.message });
    });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  sendGridTest,
  addProgress
};
