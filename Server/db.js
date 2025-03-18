
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hms',
});









function authenticateUser(username, password, callback) {
  const sqlQuery = `SELECT * FROM Doctor WHERE d_name = ? AND password = ?`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      callback(err, null);
      return;
    }

    connection.query(sqlQuery, [username, password], (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        callback(queryErr, null);
        return;
      }

      callback(null, results);
    });
  });
}






function authenticatePatient(p_number, pw, callback) {
  const sqlQuery = `SELECT * FROM patient WHERE p_number = ? AND pw = ?`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      callback(err, null);
      return;
    }

    connection.query(sqlQuery, [p_number, pw], (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        callback(queryErr, null);
        return;
      }

      callback(null, results);
    });
  });
}








function insertPatientData(patientData, callback) {
  console.log(patientData);
  const { alloted_doct, name, sex, phoneNumber, email, address, diseaseDescription, timeQuarter } = patientData;

  const sqlQuery = `
    INSERT INTO patient (alloted_doct, p_name, p_sex, p_number, p_email, p_address, p_desc, p_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      callback(err, null);
      return;
    }

    connection.query(
      sqlQuery,
      [alloted_doct, name, sex, phoneNumber, email, address, diseaseDescription, timeQuarter],
      (queryErr, results) => {
        connection.release();

        if (queryErr) {
          console.error('Error executing query:', queryErr);
          callback(queryErr, null);
          return;
        }

        callback(null, results);
      }
    );
  });
}











function insertEmergencyData(formData, callback) {
  const { patientName, patientSex, patientNumber, patientEmail, patientAddress, patientDescription } = formData;

  const sqlQuery = `
    INSERT INTO emergency (e_name, e_sex, e_number, e_email, e_address, e_description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      callback(err, null);
      return;
    }

    connection.query(
      sqlQuery,
      [patientName, patientSex, patientNumber, patientEmail, patientAddress, patientDescription],
      (queryErr, results) => {
        connection.release();

        if (queryErr) {
          console.error('Error executing query:', queryErr);
          callback(queryErr, null);
          return;
        }

        callback(null, results);
      }
    );
  });
}










function updatePatientStatus(patientId, status, callback) {
  const sqlQuery = `UPDATE patient SET p_status = ? WHERE patient_id = ?`;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      callback(err, null);
      return;
    }

    connection.query(sqlQuery, [status, patientId], (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        callback(queryErr, null);
        return;
      }

      callback(null, results);
    });
  });
}












function getPatientInfo(patientId, callback) {
  const sqlQuery = 'SELECT p_name, p_sex, p_number, p_email, p_address FROM patient WHERE p_number = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      callback(err, null);
      return;
    }

    connection.query(sqlQuery, [patientId], (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        callback(queryErr, null);
        return;
      }

      // Assuming the query returns only one row for the patient
      const patientInfo = results[0];
      callback(null, patientInfo);
    });
  });
}

function getPatientsByDoctor(alloted_doct, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return callback(err, null);
    }

    const sql = 'SELECT * FROM patient WHERE alloted_doct = ?';
    connection.query(sql, [alloted_doct], (queryErr, results) => {
      connection.release(); // Release the connection back to the pool

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        return callback(queryErr, null);
      }
      console.log("got here");
      callback(null, results);
    });
  });
}




function getPatientsInfo(p_number, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return callback(err, null);
    }

    const sql = 'SELECT * FROM patient WHERE p_number = ?';
    connection.query(sql, [p_number], (queryErr, results) => {
      connection.release(); // Release the connection back to the pool

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        return callback(queryErr, null);
      }
      console.log("got here");
      callback(null, results);
    });
  });
}






function getDoctors(callback) {
  const sqlQuery = 'SELECT doctor_id, d_name, phoneno, d_desc FROM doctor';

  pool.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}







function getEmergencyPatients(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return callback(err, null);
    }

    const sql = 'SELECT * FROM emergency';
    connection.query(sql, (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        return callback(queryErr, null);
      }

      callback(null, results);
    });
  });
}






module.exports = {
  authenticateUser,
  insertPatientData,
  getPatientsByDoctor,
  getPatientsInfo,
  getDoctors,
  insertEmergencyData,
  getEmergencyPatients,
  updatePatientStatus,
  authenticatePatient,
};
