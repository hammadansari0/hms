const express = require('express')
const bodyParser = require('body-parser')
const { authenticateUser, insertPatientData, getPatientsByDoctor, getPatientsInfo, getDoctors, insertEmergencyData, getEmergencyPatients, updatePatientStatus, authenticatePatient } = require('./db')

const app = express()
app.use(bodyParser.json());


app.get("/doct", (req, res) => {
  getDoctors((err, doctors) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(doctors);
    }
  });
});





app.get('/api/doctor-patients', (req, res) => {
  var alloted_doct = req.query.doctorName;
  console.log(alloted_doct);
  if (!alloted_doct) {
    return res.status(404).json({ error: 'page not found' });
  }

  getPatientsByDoctor(alloted_doct, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
    console.log(results);

    res.json(results);
  })

});


const patientInfo = {
  name: 'John Doe',
  age: 30,
  gender: 'Male',
  // Add more patient information fields as needed
};


app.get('/api/patient-info', (req, res) => {
  var p_number = req.query.p_number;
  console.log("patient info API is hit with value in Query"+p_number);
  if (!p_number) {
    return res.status(404).json({ error: 'page not found' });
  }

  // getPatientsByDoctor
  getPatientsInfo(p_number, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
    // console.log(results);

    res.json(results);
  })
})

app.get('/emergency', (req, res) => {
  getEmergencyPatients((err, data) => {
    if (err) {
      console.error('Error fetching emergency patients:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(data);
    res.json(data);
  });
});








app.post('/emergency', (req, res) => {
  const formData = req.body;


  insertEmergencyData(formData, (err, result) => {
    if (err) {
      console.error('Error inserting emergency data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Emergency data inserted successfully');
      res.sendStatus(200);
    }
  });
});









app.post('/opd', (req, res) => {
  const patientData = req.body;
  console.log(patientData);
  if (!patientData) {
    return res.status(400).json({ error: 'Patient data is required' });
  }

  insertPatientData(patientData, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ message: 'Patient data inserted successfully' });
  });
});






app.put('/api/update-patient-status/:patientId', (req, res) => {
  const { patientId } = req.params;
  const { status } = req.body;

  updatePatientStatus(patientId, status, (err, result) => {
    if (err) {
      console.error('Error updating patient status:', err);
      res.status(500).json({ error: 'Error updating patient status' });
    } else {
      console.log('Patient status updated successfully');
      res.status(200).json({ message: 'Patient status updated successfully' });
    }
  });
});






app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  authenticateUser(username, password, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 1) {

      return res.status(200).json({ message: 'Login successful' });
    } else {

      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});






app.post('/plogin', (req, res) => {
  const { p_number, pw } = req.body;
  console.log(p_number);
  console.log(pw);
  if (!p_number || !pw) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  authenticatePatient(p_number, pw, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 1) {

      return res.status(200).json({ message: 'Login successful' });
    } else {

      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});






app.listen(5000, () => { console.log("Server started on 5000") })


