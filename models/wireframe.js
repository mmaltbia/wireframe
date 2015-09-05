var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WireframeSchema = new Schema({
  shape: Number,
  color: String,
  title: String,
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;