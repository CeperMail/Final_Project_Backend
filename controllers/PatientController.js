// import Model Patient
const Patient = require ("../models/Patient")

// menggunakan express validator untuk mengecek 
const { validationResult } = require('express-validator');

// buat class PatientController
class PatientController {
  //menampilkan semua data
  async index(req, res) {
    try {
      // memanggil method static all dengan async await.
      const patients = await Patient.all();

      let message = "Menampilkan semua patients";
      if (patients.length === 0) {
        message = "Data kosong";
      }

      const data = {
        message: message,
        data: patients,
      };

      res.status(200).json(data);
    } 
    catch (error) {
      console.error("Error retrieving patients:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //menambahkan data
  async store(req, res) {
    /**
     * Method create mengembalikan data yang baru diinsert.
     * Mengembalikan response dalam bentuk json.
     * validasi input menggunakan express validator.
     */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "All fields must be filled correctly", errors: errors.array() });
    }

    try {
      const newPatient = await Patient.create(req.body);

      const data = {
        message: "Menambahkan data patient",
        data: newPatient,
      };

      res.status(201).json(data);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  }

  //mengedit data
  async update(req, res) {
    const { id } = req.params;
    // cari id patient yang ingin diupdate
    const patient = await Patient.findById(id);

    if(patient) {
      // melakukan update data
      const patient = await Patient.update(id, req.body);
      const data = {
        message: `Mengedit data patients`,
        data: patient,
      };
      res.status(200).json(data);
    }
    else {
      const data = {
        message: `Patient not found`,
      };

      res.status(404).json(data);
    }
  }

  //menghapus data
  async destroy(req, res) { 
    const {id} = req.params;
    const patient = await Patient.findById(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: `Menghapus data patients`,
        data: patient,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient not found`,
      };

      res.status(404).json(data);
    }
  }

  //mencari pasien berdasarkan id atau nama
  async show(req, res) {
    const { param } = req.params;

    // mengecek jika parameter adalah id
    if (!isNaN(param)) {
      const patientById = await Patient.findById(param);

      if (patientById) {
        const data = {
          message: `Menampilkan detail patient by ID`,
          data: patientById,
        };
        return res.status(200).json(data);
      }
    }

    // jika tidak ditemukan sebagai id, maka akan dicari sebagai name
    const patientByName = await Patient.findByName(param);

    if (patientByName) {
      const data = {
        message: `Menampilkan detail patient by Name`,
        data: patientByName,
      };
      return res.status(200).json(data);
    }

    // jika id atau nama tidak ditemukan, return 404
    const data = {
      message: `Patient not found`,
    };
    return res.status(404).json(data);
  }

  //menampilkan pasien meninggal
  async showDead(req, res) {
    try {
      const deadPatients = await Patient.findByStatus("dead");

      if (deadPatients.length > 0) {
        const data = {
          message: `Menampilkan patients dengan status dead`,
          data: deadPatients,
        };
        res.status(200).json(data);
      } else {
        const data = {
          message: `Tidak ada patients dengan status dead`,
        };
        res.status(404).json(data);
      }
    } catch (error) {
      console.error("Error retrieving dead patients:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //menampilkan pasien positive
  async showPositive(req, res) {
    try {
      const positivePatients = await Patient.findByStatus("positive");

      if (positivePatients.length > 0) {
        const data = {
          message: `Menampilkan patients dengan status positive`,
          data: positivePatients,
        };
        res.status(200).json(data);
      } else {
        const data = {
          message: `Tidak ada patients dengan status positive`,
        };
        res.status(404).json(data);
      }
    } catch (error) {
      console.error("Error retrieving positive patients:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //menampilkan pasien recovered
  async showRecovered(req, res) {
    try {
      const recoveredPatients = await Patient.findByStatus("recovered");

      if (recoveredPatients.length > 0) {
        const data = {
          message: `Menampilkan patients dengan status recovered`,
          data: recoveredPatients,
        };
        res.status(200).json(data);
      } else {
        const data = {
          message: `Tidak ada patients dengan status recovered`,
        };
        res.status(404).json(data);
      }
    } catch (error) {
      console.error("Error retrieving recovered patients:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}


// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
