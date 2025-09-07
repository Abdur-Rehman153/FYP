import React, { useState, useEffect } from "react";
import "../Styles/TV.css";
import TV1 from "../Assets/1.png";
import TV2 from "../Assets/2.png";
import TV3 from "../Assets/3.png";
import TV4 from "../Assets/4.png";
import TV5 from "../Assets/5.png";
import { useNavigate  } from "react-router-dom";


const TV = () => {
  const navigate = useNavigate();
  // Array of background images
  const backgroundImages = [TV1, 
    TV2, 
    TV3, 
    TV4, 
    TV5
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance images every 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };
  const handleBloodDonationClick = () => {
    navigate("/bloodDonation");
  };

  return (
    <div className="tv-container">
      {/* Background Images Container */}
      <div className="tv-background">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`tv-bg-image ${index === currentImageIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="tv-overlay"></div>
      </div>

      {/* Content */}
      <div className="tv-content">
        <div className="content-wrapper">
          <div className="content-box">
            <h2 className="tv-title">
              Connect. Donate.
              <br />
              Save Lives.
            </h2>
            <p className="tv-subtitle">
              Join a growing community of donors and recipients. Whether you're
              looking to donate blood or in need of a life-saving donation, Aid
              Hive is here to connect you in real time.
            </p>
            <div className="button-group">
              <button className="btn btn-primary"  type="button" onClick={handleBookAppointmentClick}>Find Blood Donors</button>
              <button className="btn btn-secondary"  type="button" onClick={handleBloodDonationClick}>Donate Blood</button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="tv-dots">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`dot ${index === currentImageIndex ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TV;
