const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  recoveryQuestion: {
    type: String,
    required: true
  },
  recoveryAnswer: {
    type: String,
    required: true
  },
  height: {
    type: Number
  },
  weightRecords: [
    {
      date: {
        type: Date
      },
      weight: {
        type: Number
      }
    }
  ],
  workouts: [
    {
      workout: {
        type: Schema.Types.ObjectId,
        ref: "Workout"
      }
    }
  ],
  calendar: [
    {
      date: {
        type: Date
      },
      workout: {
        type: Schema.Types.ObjectId,
        ref: "Workout"
      }
    }
  ]
});

// const userSchema = new Schema(UserSchema)

// TODO: Refactor one or the other pre or checkPW for consistent async handling
UserSchema.pre("save", function(next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
  bcrypt.hash(this.recoveryAnswer, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.recoveryAnswer = hash;
    next();
  });
});

UserSchema.methods.checkPassword = async function(plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

UserSchema.methods.checkRecoveryAnswer = async function(plainTextAnswer) {
  return await bcrypt.compare(plainTextAnswer, this.recoveryAnswer);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
