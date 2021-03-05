const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: String,
  sets: Number,
  reps: Number,
  rest: Number,
});

/*const Exercise = mongoose.SchemaTypes('Exercise', exerciseSchema);
Schema.Types.Exercise = Exercise*/

const workoutSchema = new Schema({
  title: String,
  description: String,
  exercises: [String],
  weekdays: [String], //<"Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun">

  //imageUrl: String
  //local: String
  //session duration: String (tipo 1h30m)

});

const Workout = mongoose.model('Workout', workoutSchema);


module.exports = Workout;