// AboutUs.js
import React from 'react';
import './AboutUs.css'; // Create a CSS file for styling
import Hospital from './Hospital.jpg'
import PrevData from './PrevData.png';
import Community from './Community.png';
import OurTeam from './OurTeam.png';



const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-section">
        <img src={OurTeam} alt="LeftImage" className="about-image" />
        <div className="about-content">
          <h2>Our Team</h2>
          <p>
            Our dedicated team of healthcare professionals is passionate about delivering quality care
            and ensuring the well-being of our patients. Meet the individuals who make our hospital a
            trusted healthcare provider.
          </p>
        </div>
      </div>
      <div className="about-section">
        <div className="about-content">
          <h2>Success History</h2>
          <p>
            Over the years, our hospital has achieved significant milestones and successes in providing
            healthcare services. We take pride in our accomplishments and continuous commitment to
            excellence.
          </p>
        </div>
        <img src={PrevData} alt="RightImage" className="about-image" />
      </div>
      <div className="about-section">
        <img src={Hospital} alt="LeftImage" className="about-image" />
        <div className="about-content">
          <h2>Services</h2>
          <p>
            Our hospital offers a comprehensive range of medical services, including but not limited to
            diagnostic services, surgical procedures, emergency care, and preventive health programs.
          </p>
        </div>
      </div>
      <div className="about-section">
        <div className="about-content">
          <h2>Community Outreach</h2>
          <p>
            We actively engage with the community through various health camps and awareness programs.
            These initiatives aim to promote health education and reach out to individuals in need.
          </p>
        </div>
        <img src={Community} alt="RightImage" className="about-image" />
      </div>
      {/* Add more sections and details as needed */}
    </div>
  );
};

export default AboutUs;
