// Main.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.css';
import Hospital from './Hospital.jpg';
import img1 from './img1.jpg';
import img2 from './img2.jpeg';
import img3 from './img3.jpeg';

const Main = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientSex, setPatientSex] = useState('male');
  const [patientNumber, setPatientNumber] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [patientDescription, setPatientDescription] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPatientAddress('');
    setPatientDescription('');
    setPatientEmail('');
    setPatientName('');
    setPatientNumber('');
    setPatientSex('male');
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

  return (
    <div className="main-container">
      <Slider {...sliderSettings}>
        <div>
          <img src={img2} alt="Image1" className="carousel-image" />
        </div>
        <div>
          <img src={img1} alt="Image2" className="carousel-image" />
        </div>
        <div>
          <img src={img3} alt="Image3" className="carousel-image" />
        </div>

      </Slider>

      <div className="hospital-info-container">
        <div className="hospital-info">
          <h2>GIET HOSPITAL</h2>
          <p>Address: Gunupur, Rayagada 765022</p>
          <p>Phone: (123) 456-7890</p>
          <p>Description: Lorem ipsum dolor sit amet praesentium provident adipisci officiis sequi quod repudiandae hic perferendis molestias sapiente soluta? Ratione tenetur omnis obcaecati eum? Obcaecati eius error molestiae blanditiis commodi reprehenderit iusto, quibusdam laboriosam sunt est possimus iste explicabo animi eveniet dolorum repellendus aspernatur nemo illum quo cumque enim atque! Dolor et sed culpa quos. Adipisci enim vero, autem, reprehenderit tempore ex corporis veniam sint,</p>
          <button onClick={openModal}>Emergency</button>
        </div>
        <div className="hospital-image">
          <img src={Hospital} alt="Hospital" />
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Emergency Patient</h2>
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
              <label htmlFor="patientName">Patient Name:</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />

              <label htmlFor="patientSex">Patient Sex:</label>
              <select
                id="patientSex"
                name="patientSex"
                value={patientSex}
                onChange={(e) => setPatientSex(e.target.value)}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label htmlFor="patientNumber">Phone Number:</label>
              <input
                type="tel"
                id="patientNumber"
                name="patientNumber"
                value={patientNumber}
                onChange={(e) => setPatientNumber(e.target.value)}
                required
              />

              <label htmlFor="patientEmail">Email:</label>
              <input
                type="email"
                id="patientEmail"
                name="patientEmail"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                required
              />

              <label htmlFor="patientAddress">Address:</label>
              <textarea
                id="patientAddress"
                name="patientAddress"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                required
              />

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
    </div>
  );
};

export default Main;
