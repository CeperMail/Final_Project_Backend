// import PatientControl
const PatientController =
require("../controllers/PatientController")

//untuk validasi 
const { body } = require('express-validator');

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get("/patients", PatientController.index);

//route menambahkan data
router.post(
  '/patients',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('status').notEmpty().withMessage('Status is required'),
  ],
  PatientController.store
);

//untuk mengedit data
router.put("/patients/:id", PatientController.update);

//untuk menghapus data
router.delete("/patients/:id", PatientController.destroy);

//untuk mencari berdasarkan status dead
router.get("/patients/status/dead", PatientController.showDead);

//untuk mencari berdasarkan status positive
router.get("/patients/status/positive", PatientController.showPositive);

//route untuk mencari berdasarkan status recovered
router.get('/patients/status/recovered', PatientController.showRecovered);

//untuk mencari berdasarkan id dan nama
router.get("/patients/:param", PatientController.show);


// export router
module.exports = router;
