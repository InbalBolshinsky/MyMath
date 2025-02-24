const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const exerciseHistorySchema = new mongoose.Schema({
  date: String,
  time: String,
  difficulty: String,
  score: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
  duration: { type: Number, default: 0 } 
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  exerciseHistory: [exerciseHistorySchema],
  trophies: [{ type: String }],
  highScore: { type: Number, default: 0 }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
