const express = require("express"); //its an http server that allow us to use this under http protocol
const router = express.Router();
const Workout = require("../models/workout-model");
const mongoose = require("mongoose");
const fileUpload = require("../configs/cloudinary");

//CRUD
//READ
router.get("/workouts", (req, res) => {
  Workout.find()
    .then((allWorkoutsFromDB) => {
      res.status(200).json(allWorkoutsFromDB);
    })
    .catch((error) => {
      res.status(200).json(`Error occured ${error}`);
    });
});

//CREATE
router.post("/workouts", (req, res) => {
  const { title, description, weekdays, exercises } = req.body;

  if (!title || !description || !weekdays || !exercises) {
    //quero que isto o cliente previna isto
    res.status(400).json("Missing Fields");
    return;
  }
  Workout.create({
    title,
    description,
    weekdays,
    exercises,
    //local
    //duration
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

//Route to add image to cloudinary
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

//Route to add image to cloudinary
router.post("/upload", fileUpload.single("file"), (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  } catch (error) {
    res.status(500).json(`Error occurred ${error}`);
  }
});

module.exports = router;
