const express = require("express"); //its an http server that allow us to use this under http protocol
const router = express.Router();
const Project = require("../models/project-model");
const mongoose = require ("mongoose");
const fileUpload = require("../configs/cloudinary");


//CRUD
//READ
router.get("/projects", (req, res) => {
  Project.find()
    .then((allProjectsFromDB) => {
      res.status(200).json(allProjectsFromDB);
    })
    .catch((error) => {
      res.status(200).json(`Error occured ${error}`);
    });
});


//CREATE
router.post("/projects", (req, res) => {
  const { title, description, imageUrl } = req.body;

  if (!title || !description || !imageUrl) {
    res.status(400).json("Missing Fields");
    return;
  }
  Project.create({
    title,
    description,
    imageUrl,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(`Error occured ${error}`);
    });
});


//DELETE
router.delete("/projects/:id", (req, res) => {
  Project.findByIdAndRemove(req.params.id).then(() => {
    res.status(200).json(`Project with id ${req.params.id} was deleted`);
  });
});

router.get("/projects/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json("Specified id is not valid");
    return;
  }
  Project.findById(req.params.id)
    .then((projectFromDB) => {
      res.status(200).json(projectFromDB);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

//UPDATE
router.put('/projects/:id', (req, res) => {
  const projectWithNewData = req.body;
  Project.findByIdAndUpdate(req.params.id, projectWithNewData)
    .then(() => {
      res.status(200).json(`Project with id ${req.params.id} was updated`);
    }).catch((error) => {
      res.status(500).json(`Error occurred ${error}`);
    });
});

//Route to add image to cloudinary
router.put('/projects/:id', (req, res) => {
  const projectWithNewData = req.body;
  Project.findByIdAndUpdate(req.params.id, projectWithNewData)
    .then(() => {
      res.status(200).json(`Project with id ${req.params.id} was updated`);
    }).catch((error) => {
      res.status(500).json(`Error occurred ${error}`);
    });
});

//Route to add image to cloudinary
router.post('/upload', fileUpload.single('file'), (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path});
  } 
  catch(error) {
    res.status(500).json(`Error occurred ${error}`);
  };
});

module.exports = router;
