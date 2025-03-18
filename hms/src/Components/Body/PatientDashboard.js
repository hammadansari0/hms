
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GraphChart from '../Graph/GraphChart';
import './patient.css';

const PatientDashboard = () => {
    const [patientInfo, setPatientInfo] = useState(null);
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [patientName, setPatientName] = useState('');
    const [patientSex, setPatientSex] = useState('male');
    const [patientNumber, setPatientNumber] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientAddress, setPatientAddress] = useState('');
    const [patientDescription, setPatientDescription] = useState('');

    const openModal = () => {
        setModalOpen(true);
        setPatientAddress(patientInfo?.p_address);
        setPatientEmail(patientInfo?.p_email);
        setPatientName(patientInfo?.p_name);
        setPatientNumber(patientInfo?.p_number);
        setPatientSex(patientInfo?.p_sex);
    };

    const closeModal = () => {
        setModalOpen(false);
        
        setPatientDescription('');
        
    };

    const handleFormSubmit = async (formData) => {
        try {
          // Make a POST request to the server with the form data
          const response = await fetch('/emergency', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Form submitted successfully!');
            closeModal(); 
          } else {
            console.error('Failed to submit form');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };

    useEffect(() => {
        const p_number = localStorage.getItem('p_number');
        console.log("number is recovered  " + p_number);


        fetch(`/api/patient-info?p_number=${p_number}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPatientInfo(data[0]);
                console.log("this step is completed")
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, []);
    console.log(patientInfo);
    const handleLogout = () => {
        navigate('/');

    }
    const chartData = [

        { name: 'Jan', data: 0 },
        { name: 'Feb', data: 0 },
        { name: 'Mar', data: 0 },
        { name: 'Apr', data: 0 },
        { name: 'May', data: 0 },
        { name: 'Jun', data: 1 },
        { name: 'Jul', data: 0 },
        { name: 'Aug', data: 0 },
        { name: 'Sep', data: 1 },
        { name: 'Oct', data: 0 },
        { name: 'Nov', data: 1 },
        { name: 'Dec', data: 0 },
    ];

    return (
        <div>

            <div className="parent-container">
                <div className="patient-info-container">
                    <button onClick={openModal}>Need assistance ?</button>
                    {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Appointment</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // You can collect form data and pass it to handleFormSubmit
                handleFormSubmit({
                  patientName,
                  patientSex,
                  patientNumber,
                  patientEmail,
                  patientAddress,
                  patientDescription,
                });
              }}
            >
              

              <label htmlFor="patientDescription">Description:</label>
              <textarea
                id="patientDescription"
                name="patientDescription"
                value={patientDescription}
                onChange={(e) => setPatientDescription(e.target.value)}
                required
              />

              <button type="submit">Submit</button>
            </form>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
                    <button onClick={handleLogout}>Logout</button>
                    {patientInfo && (
                        <div className="patient-info">

                            <h2>Patient Information</h2>


                            <p>Name: {patientInfo?.p_name}</p>
                            <p>Phone Number: {patientInfo?.p_number}</p>
                            <p>Email: {patientInfo?.p_email}</p>
                            <p>Gender: {patientInfo?.p_sex}</p>
                            <p>Address: {patientInfo?.p_address}</p>

                        </div>

                    )}

                </div>

                <div className="chart-container">
                    <GraphChart className="graph-chart" data={chartData} width={600} height={300} />
                </div>
            </div>
            <div className="table-heading">

                <h2>Appointments</h2>


            </div>
            <table className="patient-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>doctor</th>
                        <th>Patient Description</th>
                        <th>Doctor Medication</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{patientInfo?.patient_id}</td>
                        <td>{patientInfo?.alloted_doct}</td>
                        <td>{patientInfo?.p_desc}</td>
                        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cum id nostrum dicta ea eius, adipisci deleniti veniam ex, neque praesentium beatae suscipit illo quis exercitationem porro corrupti eum harum?</td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PatientDashboard;
