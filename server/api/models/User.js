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
  height: {
    type: Number,
    required: true
  },
  weightRecords: [
    {
      date: {
        type: Date,
        required: true
      },
      weight: {
        type: Number,
        required: true
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
        type: Date,
        required: true
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
});

UserSchema.methods.checkPassword = async function(plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
