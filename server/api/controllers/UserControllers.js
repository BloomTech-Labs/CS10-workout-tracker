const User = require("../models/User");
// const jwt = require("jsonwebtoken");
const { generateToken, generateResetToken } = require("../utilities/auth");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripeTestAPIKey = process.env.STRIPE_API_KEY_TEST;
// !! This is for development environment, there is a different API key for production !!
const stripe = require("stripe")(stripeTestAPIKey);

// const secret = process.env.SECRET;
const sgAPIKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.MAILER_EMAIL_ID;
sgMail.setApiKey(sgAPIKey);

// function generateToken(user) {
//   const options = {
//     expiresIn: "30m"
//   };
//   const payload = { name: user.username };

//   return jwt.sign(payload, secret, options);
// }

const register = (req, res) => {
  const { username, password, email } = req.body;

  const newUser = new User({
    username,
    password,
    email
  });
  newUser
    .save()
<<<<<<< HEAD
    .then(user => {
      const token = generateToken(user.username, user._id);
      res.json({ user, token });
=======
    .then(createdUser => {
      const token = generateToken(createdUser.username, createdUser._id);
      res.json({ user: createdUser, token });
>>>>>>> 40663faa9fccfdd02650532a4b454e499008cfc1
    })
    .catch(err => {
      res.status(422);
      res.json({ "Error creating user": err.message });
    });
};

const login = (req, res) => {
  console.log("Trying to log in. Got this http request: ", req.body);
  const { username, password } = req.body;

  User.findOne({ username: username.toLowerCase() })
    .then(user => {
      console.log(`Found ${username} in the User collection:`, user);
      user.checkPassword(password).then(success => {
        if (!success) {
          console.log(`Failed to match ${username}'s PW.`);
          res.status(422);
          res.json("Password incorrect");
        }
        if (success) {
          console.log(
            `${username}'s password was correct. Procuring a token...`
          );
          res.status(200);
          const token = generateToken(username, user._id);
          console.log(`Procured a token for ${username}:`, token);
          res.json({ user, token });
        }
      });
    })
    .catch(err => {
      res.status(404);
      res.json({ "Username not found": err.message });
    });
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "No email provided" });
  }
  User.findOne({ email: email }).then(user => {
    const token = generateResetToken(user);

    User.findOneAndUpdate({ email: email }, { passwordResetToken: token }).then(
      user => {
        // TODO: !!this should be an environment variable!!
        const url = "http://localhost:3000/reset?token=" + token;
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
      }
    );
  });
};

const resetPassword = function(req, res) {
  let { token, newPassword, confirmNewPassword } = req.body;

  // let payload = jwt.decode(token);
  // console.log(payload);
  console.log(token);

  User.findOne({
    passwordResetToken: token
  }).then((user, err) => {
    if (!err && user) {
      if (newPassword === confirmNewPassword) {
        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.save(err => {
          if (!err) {
            let data = {
              to: user.email,
              from: senderEmail,
              subject: "Password Reset Confirmation",
              text:
                "username, Your password has been successfully reset, you can now log in with your new password. Cheers!",
              html: `<h3>${
                user.username
              }, </h3> <p> Your password has been successfully reset, you can now log in with your new password.</p> <br> <p>Cheers!</p>`
            };

            sgMail.send(data, err => {
              if (!err) {
                return res.json({ message: "Password reset" });
              } else {
                return res.json({ error: err.message });
              }
            });
          } else {
            return res.status(422).json({ error: "from 157", message: err });
          }
        });
      } else {
        return res.status(422).send({ message: "Passwords do not match" });
      }
    } else {
      return res.status(400).send({
        message: "Password reset token is invalid or has expired."
      });
    }
  });
};

const tokenLogin = (req, res) => {
  User.findById(req.userId)
    .then(user => {
      res.status(200);
      const token = generateToken(user.username, req.userId);
      res.json({ user, token });
    })
    .catch(err => {
      res.status(404);
      res.json({ "Failed to login with your token: ": err.message });
    });
};

const ping = (req, res) => {
  const { username } = req.body;
  res.status(200);
  res.json({
    message: "The tokenized username is ok!",
    tokenizedUsername: username
  });
};

const changePassword = (req, res) => {
  const { username, password, newPassword, confirmNewPassword } = req.body;
  User.findOne({ username: username }).then(user => {
    console.log(user);
    user.checkPassword(password).then(success => {
      if (!success) {
        res.status(422);
        res.json("Password incorrect");
      }
      if (success) {
        if (newPassword === confirmNewPassword) {
          user.password = newPassword;
          console.log(user.password);
          user.save().then(() => {
            res.status(200);
            res.json({ "New password": user.password });
          });
        } else {
          res.status(422);
          res.json("New passwords don't match");
        }
      }
    });
  });
};

const changeEmail = (req, res) => {
  const { username, newEmail } = req.body;
  User.findOneAndUpdate({ username: username }, { email: newEmail }).then(
    user => {
      user
        .save()
        .then(() => {
          console.log(user);
          res.status(200);
          res.json({ "Updated user email": user.email });
        })
        .catch(err => {
          res.status(400);
          res.json({ "Could not update email": err.message });
        });
    }
  );
};

// using async and await according to Stripe docs,
// I had a hard time getting it to play nice otherwise
const processPayment = async (req, res) => {
  const { token, id } = req.body;
  try {
    let { status } = await stripe.charges.create({
      amount: 899,
      currency: "usd",
      description: "Example Charge",
      source: token
    });
    if (status) {
      User.findByIdAndUpdate(id, { premiumUser: true })
        .then(user => {
          console.log(user);
          res.status(200);
          res.json({ status, user: user });
        })
        .catch(err => {
          res.status(404);
          res.json({ Error: err.message });
        });
    } else {
      res.status(422);
      res.json({ status });
    }
  } catch (err) {
    res.status(500);
    res.json({ "Error processing payment": err.message });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  tokenLogin,
  ping,
  changePassword,
  changeEmail,
  processPayment
};
