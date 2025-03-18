import React, { useState } from 'react';
import Modal from 'react-modal';
import './HospitalCard.css';

const HospitalCard = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    alloted_doct: props.name,
    name: '',
    sex: '',
    phoneNumber: '',
    email: '',
    address: '',
    diseaseDescription: '',
    timeQuarter: 'morning',

  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModal = () => {
    openModal();
  }

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/opd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Appointment booked successfully!');
        setFormData({
          alloted_doct: props.name,
          name: '',
          sex: '',
          phoneNumber: '',
          email: '',
          address: '',
          diseaseDescription: '',
          timeQuarter: 'morning',
        });
        closeModal(); // Close the modal after successful booking
      } else {
        console.log('Appointment booking failed!');
        // Handle the failure, show an error message, etc.
      }
    } catch (error) {
      console.error('Error during appointment booking:', error);
    }
  };
  return (
    <div className="hospital-card">

      <div className="card-content">
        <h2>Dr. {props.name}</h2>
        <p>Speciality:{props.speciality} </p>
        <p>Phone: {props.phoneNumber}</p>
        <p>Description: {props.Description}</p>
        <button className="book-appointment-button" onClick={handleModal}>Book Appointment</button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Book Appointment Modal"
          className="modal"
        >
          <h2>Book Appointment</h2>
          <form >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="sex">Sex:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={formData.sex === 'male'}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={formData.sex === 'female'}
                  onChange={handleInputChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="other"
                  checked={formData.sex === 'other'}
                  onChange={handleInputChange}
                />
                Other
              </label>
            </div>


            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="diseaseDescription">Disease Description:</label>
            <textarea
              id="diseaseDescription"
              name="diseaseDescription"
              value={formData.diseaseDescription}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="timeQuarter">Time Quarter:</label>
            <select
              id="timeQuarter"
              name="timeQuarter"
              value={formData.timeQuarter}
              onChange={handleInputChange}
              required
            >
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>

            <button type="submit" onClick={handleBookAppointment}>Book Appointment</button>
          </form>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default HospitalCard;
