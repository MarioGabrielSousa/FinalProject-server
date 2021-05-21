const express = require("express"); //its an http server that allow us to use this under http protocol
const router = express.Router();
const Workout = require("../models/workout-model");
const mongoose = require("mongoose");
const fileUpload = require("../configs/cloudinary");
const axios = require('axios');
//CRUD
//READ
router.get("/workouts", (req, res) => {
  Workout.find({isPublic: true})
    .then((allWorkoutsFromDB) => {
      res.status(200).json(allWorkoutsFromDB);
    })
    .catch((error) => {
      res.status(500).json(`Error occured ${error}`);
    });
});
router.get("/myworkouts/:userId", async (req, res) => {
  try {
    let userId = req.params.userId
   const allWorkoutsFromDB = await Workout.find( {user: userId})
   res.status(200).json(allWorkoutsFromDB);
  } catch (e) {
    res.status(500).json(`Error occured ${error}`);
  }
});

router.get("/exercises", (req, res) => {

  axios.get('https://wger.de/api/v2/exercise/?language=2&limit=500').then((response) => {
    res.status(200).json(response.data.results);
  }).catch(e => {
    res.status(500).json(e);
  })
  // call api here and get all exercises
  //https://wger.de/api/v2/exercise/?language=2
 
});

router.get("/exercises/:id", (req, res) => {
const exerciseId = req.params.id; 
  axios.get(`https://wger.de/api/v2/exerciseinfo/${exerciseId}?language=2`).then((response) => {

    res.status(200).json(response.data);
  }).catch(e => {
    res.status(500).json(e);
  })
  // call api here and get all exercises
  //https://wger.de/api/v2/exercise/?language=2
 
});


//CREATE
router.post("/workouts", (req, res) => {
  const { name, category, description, weekdays, exercises, user, isPublic } = req.body;
  console.log(req.body)

  if (!name || !category || !exercises || !user) {
    //quero que isto o cliente previna isto
    res.status(400).json("Missing Fields");
    return;
  }
  Workout.create({
    name,
    category,
    description,
    weekdays,
    exercises,
    user,
    isPublic
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(`Error occured ${error}`);
    });
});

//DELETE
router.delete("/workouts/:id", (req, res) => {
  Workout.findByIdAndRemove(req.params.id).then(() => {
    res.status(200).json(`Workout with id ${req.params.id} was deleted`);
  });
});

router.get("/workouts/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json("Specified id is not valid");
    return;
  }
  Workout.findById(req.params.id)
    .then((workoutFromDB) => {
      res.status(200).json(workoutFromDB);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

//UPDATE
router.put("/workouts/:id", (req, res) => {
  const workoutWithNewData = req.body;
  Workout.findByIdAndUpdate(req.params.id, workoutWithNewData)
    .then(() => {
      res.status(200).json(`Workout with id ${req.params.id} was updated`);
    })
    .catch((error) => {
      res.status(500).json(`Error occurred ${error}`);
    });
});

module.exports = router;
