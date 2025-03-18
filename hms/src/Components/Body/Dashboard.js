import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [doctorPatients, setDoctorPatients] = useState([]);
    const [username, setUsername] = useState('');
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [emergencyPatients, setEmergencyPatients] = useState([]);


    const closeModal = () => {
        setShowEmergencyModal(false);
    };

    const handleEmergencyClick = () => {
        setShowEmergencyModal(true);

        fetch('/emergency')
            .then((response) => response.json())
            .then((data) => {
                setEmergencyPatients(data);
            })
            .catch((error) => {
                console.error('Error fetching emergency data:', error);
            });
    };

    useEffect(() => {
        const username = localStorage.getItem('username');
        setUsername(username);

        if (!username) {
            console.log('Username not found in URL');
        }

        fetch(`/api/doctor-patients?doctorName=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setDoctorPatients(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogout = () => {
        console.log('Logout clicked');
        window.location.href = '/login';
    };

    const handleStatusChange = (index, status) => {

        const updatedPatients = [...doctorPatients];
        updatedPatients[index].status = status;
        setDoctorPatients(updatedPatients);

        
    };

    const handleSave = (patientId, status) => {

        fetch(`/api/update-patient-status/${patientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        })
            .then((response) => response.json())
            .then((data) => {

                console.log('Patient status updated:', data);
                if (status === 'Attended') {
                    alert('Patient has been successfully attended');
                }
                if (status === 'Postponed') {
                    alert('Patient has been successfully postponed');
                }

                const updatedPatients = [...doctorPatients];
                updatedPatients.find((patient) => patient.patient_id === patientId).saved = true;
                setDoctorPatients(updatedPatients);
            })
            .catch((error) => {
                console.error('Error updating patient status:', error);
            });
    };

    // useEffect(() => {
    //     // Assuming doctorPatients have 'status' property to indicate the patient status
    //     const updatedPatients = doctorPatients.map(patient => ({
    //         ...patient,
    //         backgroundColor: patient.p_status === 'Attended' ? 'green' : 'blue'
    //     }));
    //     setDoctorPatients(updatedPatients);
    // }, [doctorPatients]);

    return (
        <div className="dashboard">
            <div className="logout-button-container">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
                &nbsp; &nbsp;
                <button onClick={handleEmergencyClick}>Emergency</button>
            </div>
            <h2>Dashboard</h2>

            <div className="doctor-section">
                <h3 className="doctor-name">Doctor: {username}</h3>

                {showEmergencyModal && (
                    <div className="emergency-modal">
                        <div className="modal-content">
                            <div className="close-button">
                                <h2>Emergency Patients</h2>
                                <button className="close" onClick={closeModal}>
                                    close
                                </button>
                            </div>
                            <table className="e-patient-table">
                                <thead>
                                    <tr>
                                        <th>Patient Id</th>
                                        <th>Patient Name</th>
                                        <th>Patient Address</th>
                                        <th>Patient Sex</th>
                                        <th>Patient Phone Number</th>
                                        <th>Patient Email</th>
                                        <th>Patient Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emergencyPatients.map((emergencyPatient) => (
                                        <tr key={emergencyPatient.id}>
                                            <td>{emergencyPatient.id}</td>
                                            <td>{emergencyPatient.e_name}</td>
                                            <td>{emergencyPatient.e_address}</td>
                                            <td>{emergencyPatient.e_sex}</td>
                                            <td>{emergencyPatient.e_number}</td>
                                            <td>{emergencyPatient.e_email}</td>
                                            <td>{emergencyPatient.e_description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className="table-heading">
                    <h2>OPD Patients</h2>
                </div>
                <table className="patient-table">
                    <thead>
                        <tr>
                            <th>Patient Id</th>
                            <th>Patient Name</th>
                            <th>Patient Address</th>
                            <th>Patient Sex</th>
                            <th>Patient Phone Number</th>
                            <th>Patient Email</th>
                            <th>Patient Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorPatients.map((doctorPatient, index) => (
                            <tr key={doctorPatient.patient_id}>
                                <td>{doctorPatient.patient_id}</td>
                                <td>{doctorPatient.p_name}</td>
                                <td>{doctorPatient.p_address}</td>
                                <td>{doctorPatient.p_sex}</td>
                                <td>{doctorPatient.p_number}</td>
                                <td>{doctorPatient.p_email}</td>
                                <td>{doctorPatient.p_desc}</td>
                                <td>

                                    <select
                                        value={doctorPatient.p_status}
                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                    >
                                        <option value="Not Attended">Not Attended</option>
                                        <option value="Attended">Attended</option>
                                        <option value="Postponed">Postponed</option>
                                    </select>
                                </td>
                                <td>

                                    <button
                                        onClick={() => handleSave(doctorPatient.patient_id, doctorPatient.status)}
                                        
                                    >
                                        Save
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
