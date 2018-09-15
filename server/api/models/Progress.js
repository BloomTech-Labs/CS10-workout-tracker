const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");


const ProgressSchema = Schema({
    date: {
        type: Date,
        default: Date.now
    },
    weight: Number,
    hips: Number,
    waist: Number,
    r_arm: Number,
    l_arm: Number,
    r_leg: Number,
    l_leg: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

ProgressSchema.pre('remove', function(next) {
    console.log("pre save remove hook was fired")
    this.model('User').remove({ $progress_id : this._id}, next);
    next();
});

const Progress = mongoose.model("Progress", ProgressSchema);
module.exports = Progress;