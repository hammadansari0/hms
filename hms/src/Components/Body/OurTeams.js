import React, { useEffect, useState } from "react";
import HospitalCard from './HospitalCard';

function Teams() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors from the '/doct' endpoint
    fetch('/doct')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          console.error('Invalid data format. Expected an array of doctors.');
        }
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const desc = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, et!";

  return (
    <div className="hospital-cards">
      {Array.isArray(doctors) &&doctors.map(doctor => (
        <HospitalCard
          key={doctor.doctor_id} 
          name={doctor.d_name}
          speciality={doctor.d_desc}
          phoneNumber={doctor.phoneno}
          Description={desc}
        />
      ))}
    </div>
  );
}

export default Teams;
