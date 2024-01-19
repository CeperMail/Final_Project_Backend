// import database
const db = require ("../config/database")
// membuat class Patient
class Patient {
    /**
     * Membuat method static all.
     * Digunakan untuk mengambil semua data pasien dari database.
     */
    static all() {
        // Mengembalikan Promise sebagai solusi Asynchronous
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients";
            /**
             * Melakukan query menggunakan method query.
             * Menerima 2 parameter: query dan callback
             */
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    /**
     * Method untuk menyimpan data pasien baru ke dalam database.
     * Menerima parameter data yang akan diinsert.
     * Mengembalikan data Pasien yang baru diinsert.
     */
    static create(data) {
        return new Promise((resolve, reject) => {
            const { name, phone, address, status } = data;
            const sql = "INSERT INTO patients (name, phone, address, status, in_date_at, out_date_at, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NULL, NOW(), NOW())";

            db.query(sql, [name, phone, address, status], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const insertedPatient = {
                        id: results.insertId,
                        name,
                        phone,
                        address,
                        status,
                        in_date_at: results.in_date_at ? results.in_date_at : null,
                        out_date_at: results.out_date_at ? results.out_date_at : null,
                        created_at: results.affectedRows > 0 ? results.created_at : null,
                        updated_at: results.affectedRows > 0 ? results.updated_at : null,
                    };
                    resolve(insertedPatient);
                }
            });
        });
    }

    // Mengupdate data pasien
    static async update(id, data) {
        await new Promise((resolve, reject) => {
            const sql = "UPDATE patients SET ? WHERE ID = ?";
            db.query(sql, [data, id], (err, results) => {
                resolve(results);
            });
        });

        // Mencari data yang baru diupdate
        const patient = await this.findById(id);
        return patient;
    }

    // Menghapus data dari database
    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM patients WHERE id = ?";
            db.query(sql, id, (err, results) => {
                resolve(results);
            });
        });
    }

    // Mencari data berdasarkan nama
    static findByName(name) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients WHERE name = ?";
            db.query(sql, name, (err, results) => {
                // Destructuring array
                const [patient] = results;
                resolve(patient);
            });
        });
    }

    // Mencari data berdasarkan ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients WHERE id = ?";
            db.query(sql, id, (err, results) => {
                // Destructuring array
                const [patient] = results;
                resolve(patient);
            });
        });
    }

    // Mencari data berdasarkan status
    static findByStatus(status) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM patients WHERE status = ?";
            db.query(sql, status, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

// Ekspor class Patient
module.exports = Patient;

