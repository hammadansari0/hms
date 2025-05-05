// import React, { useState } from "react";
import HospitalCard from './HospitalCard';

function Teams() {
  // const [doctors, setDoctors] = useState([]);
  const data = [
    {
      "doctor_id": 1039,
      "d_name": "dhiraj",
      "phoneno": 234561789,
      "d_desc": "surgeon"
    },
    {
      "doctor_id": 1069,
      "d_name": "raja",
      "phoneno": 234561489,
      "d_desc": "Physician"
    },
    {
      "doctor_id": 1079,
      "d_name": "paji",
      "phoneno": 234561689,
      "d_desc": "Pathologist"
    },
    {
      "doctor_id": 1089,
      "d_name": "hammad",
      "phoneno": 234561989,
      "d_desc": "gynaecologist"
    },
    {
      "doctor_id": 1090,
      "d_name": "baba",
      "phoneno": 234561889,
      "d_desc": "physio-the-rapist"
    }
  ]
  // setDoctors(data);
  // useEffect(() => {
    // Fetch the list of doctors from the '/doct' endpoint
    // fetch('/doct')
    //   .then(response => response.json())
    //   .then(data => {
    //     if (Array.isArray(data)) {
    //       setDoctors(data);
    //       console.log(data);
    //     } else {
    //       console.error('Invalid data format. Expected an array of doctors.');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error fetching doctors:', error);
    //   });
  // }, []);

  const desc = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, et!";

  return (
    <div className="hospital-cards">
      {Array.isArray(data) && data.map(doctor => (
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
