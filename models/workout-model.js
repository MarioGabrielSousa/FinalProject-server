const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*const Exercise = mongoose.SchemaTypes('Exercise', exerciseSchema);
Schema.Types.Exercise = Exercise*/

const workoutSchema = new Schema({
  name: String,
  category: String,
  description: String,
  exercises: [Object],
  weekdays: [String],
  user: mongoose.Schema.Types.ObjectId, //para saber quem criou o exercício
  isPublic: Boolean
});

const Workout = mongoose.model('Workout', workoutSchema);


module.exports = Workout;